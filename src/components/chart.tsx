import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  select,
  scaleLinear,
  scaleTime,
  extent,
  line as d3Line,
  area as d3Area,
  curveLinear,
  bisector,
  pointer,
  timeFormat,
} from 'd3';

export type X = number | Date;
export interface Point { x: X; y: number; }
export type Cursor = { x: number; y: number; domainX: X; domainY: number };

interface Props {
  data: Point[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };

  accent?: string;                 // line color
  showTicks?: boolean;             // show bottom axis labels (no grid)
  splitX?: X | null;               // vertical dotted “session” line
  showSplitLine?: boolean;         // toggle the dotted divider

  onCursorChange?: (c: Cursor | null) => void; // <- NEW: lets parent mirror the hover
}

export default function CoinbaseStyleChart({
  data,
  width,
  height,
  margin,
  accent = '#9B5DFF',
  showTicks = true,
  splitX = null,
  showSplitLine = false,
  onCursorChange,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const updateCursor = (c: Cursor | null) => {
    setCursor(c);
    onCursorChange?.(c);
  };

  const isTime = data.length > 0 && data[0].x instanceof Date;
  const xDomain = useMemo(() => {
    return isTime
      ? (extent(data, d => d.x as Date) as [Date, Date])
      : (extent(data, d => d.x as number) as [number, number]);
  }, [data, isTime]);

  const xScale = useMemo(() => {
    const r: [number, number] = [margin.left, width - margin.right];
    return isTime
      ? scaleTime().domain(xDomain as [Date, Date]).range(r)
      : scaleLinear().domain(xDomain as [number, number]).range(r);
  }, [xDomain, isTime, width, margin.left, margin.right]);

  const yScale = useMemo(() => {
    const yMax = Math.max(...data.map(d => d.y));
    const yMin = Math.min(...data.map(d => d.y));
    return scaleLinear()
      .domain([yMin, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);
  }, [data, height, margin.top, margin.bottom]);

  const linePath = useMemo(
    () =>
      d3Line<Point>()
        .x(d => xScale(d.x as any))
        .y(d => yScale(d.y))
        .curve(curveLinear)(data) || '',
    [data, xScale, yScale]
  );

  const areaPath = useMemo(
    () =>
      d3Area<Point>()
        .x(d => xScale(d.x as any))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.y))
        .curve(curveLinear)(data) || '',
    [data, xScale, yScale]
  );

  const bLeft = useMemo(
    () => bisector<Point, number>(d => (isTime ? +(d.x as Date) : (d.x as number))).left,
    [isTime]
  );

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);

    // remove old overlay if any
    svg.selectAll('rect.pointer-overlay').remove();

    const inPlot = (mx: number, my: number) =>
      mx >= margin.left &&
      mx <= width - margin.right &&
      my >= margin.top &&
      my <= height - margin.bottom;

    const handleMove = (ev: PointerEvent) => {
      const [mx, my] = pointer(ev, svg.node()!);
      if (!inPlot(mx, my)) {
        updateCursor(null);
        return;
      }

      const cx = Math.max(margin.left, Math.min(width - margin.right, mx));
      const domainX = xScale.invert(cx) as X;

      const i = bLeft(data, isTime ? +(domainX as Date) : (domainX as number));
      const lo = data[Math.max(0, i - 1)];
      const hi = data[Math.min(data.length - 1, i)];

      const domXn = isTime ? +(domainX as Date) : (domainX as number);
      const loX = isTime ? +(lo.x as Date) : (lo.x as number);
      const hiX = isTime ? +(hi.x as Date) : (hi.x as number);
      const t = (domXn - loX) / (hiX - loX || 1);
      const domainY = lo.y + t * (hi.y - lo.y);
      const cy = yScale(domainY);

      updateCursor({ x: cx, y: cy, domainX, domainY });
    };

    const overlay = svg
      .append('rect')
      .attr('class', 'pointer-overlay')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .style('pointer-events', 'all')
      .style('touch-action', 'none')
      .on('pointerdown', function (event) {
        (this as Element).setPointerCapture?.((event as PointerEvent).pointerId);
        handleMove(event as unknown as PointerEvent);
      })
      .on('pointermove', (event) => handleMove(event as unknown as PointerEvent))
      .on('lostpointercapture', () => updateCursor(null))
      .on('pointerleave', () => updateCursor(null))
      .on('pointercancel', () => updateCursor(null));

    const onScroll = () => updateCursor(null);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      overlay.remove();
      window.removeEventListener('scroll', onScroll);
    };
  }, [data, width, height, margin, xScale, yScale, bLeft]);

  // drawing helpers
  const [x0, x1] = xScale.range();
  const splitXPos = splitX != null ? xScale(splitX as any) : null;

  // stable ids
  const ids = useMemo(() => {
    const uid = Math.random().toString(36).slice(2);
    return {
      clip: `clip-${uid}`,
      clipArea: `clip-area-${uid}`,
      dotsLeft: `dots-left-${uid}`,
      dotsRight: `dots-right-${uid}`,
      glow: `glow-${uid}`,
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: '#0f1115',
        borderRadius: 16,
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        style={{ display: 'block' }}
      >
        <defs>
          {/* outer clip to keep visuals inside rounded card */}
          <clipPath id={ids.clip}>
            <rect x={0} y={0} width={width} height={height} rx={16} ry={16} />
          </clipPath>

          {/* dots patterns */}
          <pattern id={ids.dotsLeft} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="6.5" r="1.2" fill={accent} opacity="0.35" />
          </pattern>
          <pattern id={ids.dotsRight} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="6.5" r="1.2" fill={accent} opacity="0.18" />
          </pattern>

          {/* clip only the area under curve */}
          <clipPath id={ids.clipArea}>
            <path d={areaPath} />
          </clipPath>

          {/* glow filter */}
          <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g clipPath={`url(#${ids.clip})`}>
          {/* dotted under-fill (split in two tones) */}
          <rect
            x={margin.left}
            y={margin.top}
            width={(splitXPos ?? x1) - margin.left}
            height={height - margin.top - margin.bottom}
            fill={`url(#${ids.dotsLeft})`}
            clipPath={`url(#${ids.clipArea})`}
          />
          <rect
            x={splitXPos ?? margin.left}
            y={margin.top}
            width={x1 - (splitXPos ?? margin.left)}
            height={height - margin.top - margin.bottom}
            fill={`url(#${ids.dotsRight})`}
            clipPath={`url(#${ids.clipArea})`}
          />
        </g>

        {/* glow stroke under main line */}
        <path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeOpacity={0.35}
          strokeWidth={10}
          filter={`url(#${ids.glow})`}
        />
        <path
          d={linePath}
          fill="none"
          stroke={accent}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* optional dotted divider (pre-market vs regular, etc.) */}
        {showSplitLine && splitXPos != null && (
          <line
            x1={splitXPos}
            x2={splitXPos}
            y1={margin.top}
            y2={height - margin.bottom}
            stroke={accent}
            strokeOpacity={0.6}
            strokeWidth={2}
            strokeDasharray="2 8"
          />
        )}

        {/* bottom baseline snapped to x-range */}
        <line
          x1={x0 + 0.5}
          x2={x1 - 0.5}
          y1={height - 0.5}
          y2={height - 0.5}
          stroke="#1f2330"
          strokeWidth={2}
          shapeRendering="crispEdges"
          pointerEvents="none"
        />

        {/* bottom tick labels only (no grid) */}
        {showTicks &&
          (isTime ? (xScale.ticks(5) as (Date | number)[]) : (xScale.ticks(5) as unknown as (Date | number)[])).map(
            (t, i) => {
              const tx = xScale(t as any);
              return (
                <text
                  key={i}
                  x={tx}
                  y={height - 8}
                  textAnchor="middle"
                  fill="#7f8796"
                  fontSize={12}
                >
                  {isTime
                    ? timeFormat('%b %-d')(t as Date)
                    : String(t as number)}
                </text>
              );
            }
          )}

        {/* hover visuals */}
        {cursor && (
          <>
            {/* vertical guide following the cursor */}
            <line
              x1={cursor.x}
              y1={margin.top}
              x2={cursor.x}
              y2={height - margin.bottom}
              stroke="#B8A3FF"
              strokeWidth={2}
              strokeDasharray="4 10"
              opacity={0.8}
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
            <circle
              cx={cursor.x}
              cy={cursor.y}
              r={3.5}
              fill="#fff"
              stroke={accent}
              strokeWidth={2}
              pointerEvents="none"
            />
          </>
        )}
      </svg>

      {/* Small floating tooltip (can be hidden by parent if desired) */}
      {cursor && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(width - 170, Math.max(8, cursor.x + 12)),
            top: Math.max(8, cursor.y - 34),
            background: 'rgba(20,22,28,0.95)',
            color: '#E6E8EB',
            border: '1px solid #2A2F3A',
            borderRadius: 8,
            padding: '6px 8px',
            fontSize: 12,
            pointerEvents: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          }}
        >
          <div style={{ fontWeight: 700 }}>{cursor.domainY.toFixed(2)}</div>
          <div style={{ opacity: 0.8 }}>
            {isTime
              ? timeFormat('%a, %b %-d, %Y, %-I:%M %p')(cursor.domainX as Date)
              : `x: ${String(cursor.domainX)}`}
          </div>
        </div>
      )}
    </div>
  );
}
