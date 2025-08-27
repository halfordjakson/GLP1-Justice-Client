// chart.helpers.ts
import * as d3 from 'd3';
import { Point, X, Margin } from '../types/chart.types';

export const isTimeSeries = (data: Point[]) =>
  data.length > 0 && data[0].x instanceof Date;

export function makeXScale(
  data: Point[],
  width: number,
  margin: Margin
): d3.ScaleTime<number, number> | d3.ScaleLinear<number, number> {
  const range: [number, number] = [margin.left, width - margin.right];
  if (isTimeSeries(data)) {
    const dom = d3.extent(data, d => d.x as Date) as [Date, Date];
    return d3.scaleTime().domain(dom).range(range);
  } else {
    const dom = d3.extent(data, d => d.x as number) as [number, number];
    return d3.scaleLinear().domain(dom).range(range);
  }
}

export function makeYScale(
  data: Point[],
  height: number,
  margin: Margin
) {
  const yMax = Math.max(...data.map(d => d.y));
  const yMin = Math.min(...data.map(d => d.y));
  return d3.scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([height - margin.bottom, margin.top]);
}

export function buildLinePath(
  data: Point[],
  xScale: d3.AxisScale<any>,
  yScale: d3.ScaleLinear<number, number>,
  curve: d3.CurveFactory = d3.curveLinear
) {
  return d3.line<Point>()
    .x(d => xScale(d.x as any))
    .y(d => yScale(d.y))
    .curve(curve)(data) || '';
}

export function buildAreaPath(
  data: Point[],
  xScale: d3.AxisScale<any>,
  yScale: d3.ScaleLinear<number, number>,
  curve: d3.CurveFactory = d3.curveLinear
) {
  return d3.area<Point>()
    .x(d => xScale(d.x as any))
    .y0(yScale(yScale.domain()[0]))
    .y1(d => yScale(d.y))
    .curve(curve)(data) || '';
}

export function labelForTimeTick(d: Date, scale: d3.ScaleTime<number, number>) {
  const [a, b] = scale.domain();
  const span = +b - +a;
  const day = 24 * 3600 * 1000;
  return span <= 2 * day ? d3.timeFormat('%-I:%M %p')(d) : d3.timeFormat('%b %-d')(d);
}

export function makeIds(prefix = 'chart') {
  const uid = Math.random().toString(36).slice(2);
  return {
    clip: `${prefix}-clip-${uid}`,
    clipArea: `${prefix}-clipArea-${uid}`,
    dotsLeft: `${prefix}-dotsLeft-${uid}`,
    dotsRight: `${prefix}-dotsRight-${uid}`,
    glow: `${prefix}-glow-${uid}`,
  };
}

/** Interpolate Y at a domain X using a bisector (handles number or Date X). */
export function interpolateYAtX(data: Point[], domainX: X) {
  const time = isTimeSeries(data);
  const toNumber = (x: X) => (time ? +(x as Date) : (x as number));
  const bLeft = d3.bisector<Point, number>(d => toNumber(d.x)).left;

  const i = bLeft(data, toNumber(domainX));
  const lo = data[Math.max(0, i - 1)];
  const hi = data[Math.min(data.length - 1, i)];
  const domXn = toNumber(domainX);
  const loX = toNumber(lo.x);
  const hiX = toNumber(hi.x);
  const t = (domXn - loX) / (hiX - loX || 1);
  return lo.y + t * (hi.y - lo.y);
}