// chart.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  select,
  scaleLinear,
  scaleTime,
  extent,
  bisector,
  pointer,
  timeFormat,
} from 'd3';
export type X = number | Date;
export interface Point { x: X; y: number; }
export type Cursor = { x: number; y: number; domainX: X; domainY: number };
type RangeKey = '1W' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | 'ALL';

interface Props {
  data: Point[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  accent?: string;                 // theme color
  showTicks?: boolean;             // show bottom axis labels (no grid)
  splitX?: X | null;               // optional vertical dotted divider
  showSplitLine?: boolean;         // toggle the divider
  pointRadius?: number;            // size of the discrete point (default 7)
  onCursorChange?: (c: Cursor | null) => void;
}
export default function ClaimsChart({
  data,
  width,
  height,
  margin,
  accent = '#FF4D00',          // 🔶 default: orange theme
  showTicks = true,
  splitX = null,
  showSplitLine = false,
  pointRadius = 7,
  onCursorChange,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const updateCursor = (c: Cursor | null) => {
    setCursor(c);
    onCursorChange?.(c);
  };

  // layout: buttons row + derived chart height
  const buttonsRow = 40;
  const chartH = Math.max(0, height - buttonsRow);

  // ==========================
  // Range selection (time only)
  // ==========================
  const [range, setRange] = useState<RangeKey>('ALL');
  const isTime = data.length > 0 && data[0].x instanceof Date;

  const filteredData = useMemo(() => {
    if (!isTime || data.length === 0) return data;
    const sorted = [...data].sort((a, b) => +a.x - +b.x);
    const lastDate = sorted[sorted.length - 1].x as Date;

    const startOfYear = new Date(lastDate.getFullYear(), 0, 1);

    const cutoffs: Record<Exclude<RangeKey, 'ALL' | 'YTD'>, number> = {
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
    };

    if (range === 'ALL') return sorted;
    if (range === 'YTD') return sorted.filter(d => +d.x >= +startOfYear);

    const days = cutoffs[range as Exclude<RangeKey, 'ALL' | 'YTD'>];
    const cutoff = new Date(+lastDate - days * 24 * 60 * 60 * 1000);
    return sorted.filter(d => +d.x >= +cutoff);
  }, [data, isTime, range]);

  // --- domains
  const xDomain = useMemo(() => {
    if (filteredData.length === 0) {
      return isTime ? [new Date(), new Date()] as [Date, Date] : [0, 1] as [number, number];
    }
    return isTime
      ? (extent(filteredData, d => d.x as Date) as [Date, Date])
      : (extent(filteredData, d => d.x as number) as [number, number]);
  }, [filteredData, isTime]);

  // --- scales
  // Data scale: padded by margins (keeps points away from card edges)
  const xScale = useMemo(() => {
    const r: [number, number] = [margin.left, Math.max(margin.left + 1, width - margin.right)];
    return isTime
      ? scaleTime().domain(xDomain as [Date, Date]).range(r)
      : scaleLinear().domain(xDomain as [number, number]).range(r);
  }, [xDomain, isTime, width, margin.left, margin.right]);

  // Axis scale: full width (axis line flush with container)
  const xAxisScale = useMemo(() => {
    const r: [number, number] = [0, width];
    return isTime
      ? scaleTime().domain(xDomain as [Date, Date]).range(r)
      : scaleLinear().domain(xDomain as [number, number]).range(r);
  }, [xDomain, isTime, width]);

  const yScale = useMemo(() => {
    const yMax = filteredData.length ? Math.max(...filteredData.map(d => d.y)) : 1;
    const yMin = filteredData.length ? Math.min(...filteredData.map(d => d.y)) : 0;
    return scaleLinear()
      .domain([Math.min(0, yMin), yMax]) // include zero floor for counts
      .nice()
      .range([chartH - margin.bottom, margin.top]);
  }, [filteredData, chartH, margin.top, margin.bottom]);

  // --- hover logic: SNAP to nearest point (no interpolation)
  const bLeft = useMemo(
    () => bisector<Point, number>(d => (isTime ? +(d.x as Date) : (d.x as number))).left,
    [isTime]
  );

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);

    svg.selectAll('rect.pointer-overlay').remove();

    const inPlot = (mx: number, my: number) =>
      mx >= margin.left &&
      mx <= width - margin.right &&
      my >= margin.top &&
      my <= chartH - margin.bottom;

    const handleMove = (ev: PointerEvent) => {
      const [mx, my] = pointer(ev, svg.node()!);
      if (!inPlot(mx, my) || filteredData.length === 0) {
        updateCursor(null);
        return;
      }

      const cxClamped = Math.max(margin.left, Math.min(width - margin.right, mx));
      const domainX = xScale.invert(cxClamped) as X;
      const i = bLeft(filteredData, isTime ? +(domainX as Date) : (domainX as number));
      const lo = filteredData[Math.max(0, i - 1)];
      const hi = filteredData[Math.min(filteredData.length - 1, i)];

      // choose nearest by x-distance
      const domXn = isTime ? +(domainX as Date) : (domainX as number);
      const loX = isTime ? +(lo.x as Date) : (lo.x as number);
      const hiX = isTime ? +(hi.x as Date) : (hi.x as number);
      const chosen = Math.abs(domXn - loX) <= Math.abs(hiX - domXn) ? lo : hi;

      const cx = xScale(chosen.x as any);
      const cy = yScale(chosen.y);

      updateCursor({ x: cx, y: cy, domainX: chosen.x, domainY: chosen.y });
    };

    const overlay = svg
      .append('rect')
      .attr('class', 'pointer-overlay')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', chartH)
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
  }, [filteredData, width, chartH, margin, xScale, yScale, bLeft, isTime]);

  // --- drawing helpers
  const splitXPos = splitX != null ? xScale(splitX as any) : null;

  // stable ids for defs (clip only)
  const ids = useMemo(() => {
    const uid = Math.random().toString(36).slice(2);
    return { clip: `clip-${uid}` };
  }, []);

  // Range buttons UI
  const ranges: RangeKey[] = ['1W', '1M', '3M', '6M', 'YTD', '1Y', 'ALL'];

  // label padding (keeps first/last labels from getting clipped)
  const labelPad = 16;

  // ticks to render along the full-width axis
  const ticks = useMemo(
    () => (isTime ? (xAxisScale.ticks(5) as (Date | number)[]) : (xAxisScale.ticks(5) as any)),
    [xAxisScale, isTime]
  );

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: '#0f1115',
        borderRadius: 16,
        display: 'grid',
        gridTemplateRows: `${buttonsRow}px 1fr`, // buttons row + chart
        gap: 4,
      }}
    >
      {/* Range Buttons (time-series only) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 8px',
          gap: 8,
          overflowX: 'auto',
        }}
      >
        {isTime ? (
          ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid ' + (range === r ? accent : '#2A2F3A'),
                background: range === r ? 'rgba(255,77,0,0.1)' : 'transparent',
                color: '#E6E8EB',
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {r}
            </button>
          ))
        ) : (
          <div style={{ color: '#8F96A3', fontSize: 12 }}>
            Range filters available when x-values are dates.
          </div>
        )}
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${chartH}`} // chart area height
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        style={{ display: 'block' }}
      >
        <defs>
          {/* outer clip for rounded card */}
          <clipPath id={ids.clip}>
            <rect x={0} y={0} width={width} height={chartH} rx={16} ry={16} />
          </clipPath>
        </defs>

        {/* optional vertical dotted divider (respects plot margins) */}
        {showSplitLine && splitXPos != null && (
          <line
            x1={splitXPos}
            x2={splitXPos}
            y1={margin.top}
            y2={chartH - margin.bottom}
            stroke={accent}
            strokeOpacity={0.6}
            strokeWidth={2}
            strokeDasharray="2 8"
          />
        )}

        {/* bottom baseline: FLUSH with full container width */}
        <line
          x1={0.5}
          x2={width - 0.5}
          y1={chartH - 0.5}
          y2={chartH - 0.5}
          stroke="#1f2330"
          strokeWidth={2}
          shapeRendering="crispEdges"
          pointerEvents="none"
        />

        {/* bottom tick labels: clamp to avoid clipping at edges */}
        {showTicks &&
          ticks.map((t: any, i: any) => {
            const txRaw = xAxisScale(t as any);
            // clamp to keep labels inside the rounded container
            const tx = Math.max(labelPad, Math.min(width - labelPad, txRaw));
            // nudge first/last anchors for better alignment
            const isFirst = txRaw <= xAxisScale.range()[0] + 0.001;
            const isLast = txRaw >= xAxisScale.range()[1] - 0.001;
            const anchor = isFirst ? 'start' : isLast ? 'end' : 'middle';

            return (
              <text
                key={i}
                x={tx}
                y={chartH - 8}
                textAnchor={anchor as 'start' | 'middle' | 'end'}
                fill="#C7CBD8"
                fontSize={12}
              >
                {isTime ? timeFormat('%b %-d')(t as Date) : String(t as number)}
              </text>
            );
          })}

        {/* DISCRETE POINTS (use inset xScale for pleasing padding) */}
        {filteredData.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d.x as any)}
            cy={yScale(d.y)}
            r={pointRadius}
            fill={accent}
            stroke="#0f1115"
            strokeWidth={2}
          />
        ))}

        {/* hover visuals — vertical guide + highlighted point (inset with plot) */}
        {cursor && (
          <>
            <line
              x1={cursor.x}
              y1={margin.top}
              x2={cursor.x}
              y2={chartH - margin.bottom}
              stroke={accent}
              strokeWidth={2}
              strokeDasharray="4 10"
              opacity={0.9}
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
            <circle
              cx={cursor.x}
              cy={cursor.y}
              r={pointRadius + 2}
              fill="#fff"
              stroke={accent}
              strokeWidth={3}
              pointerEvents="none"
            />
          </>
        )}
      </svg>

      {/* Floating tooltip */}
      {cursor && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(width - 170, Math.max(8, cursor.x + 12)),
            top: Math.max(8 + buttonsRow, cursor.y - 34), // push below buttons row
            background: 'rgba(20,22,28,0.97)',
            color: '#E6E8EB',
            border: '1px solid #2A2F3A',
            borderRadius: 8,
            padding: '6px 8px',
            fontSize: 12,
            pointerEvents: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          }}
        >
          <div style={{ fontWeight: 700 }}>{cursor.domainY.toFixed(0)}</div>
          <div style={{ opacity: 0.8 }}>
            {isTime
              ? timeFormat('%a, %b %-d, %Y')(cursor.domainX as Date)
              : `x: ${String(cursor.domainX)}`}
          </div>
        </div>
      )}
    </div>
  );
}
