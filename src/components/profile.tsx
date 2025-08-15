import React, { useMemo } from 'react';
import ChartWithRanges from './chart.ranger';
import Navigation from "./navigation"
import { type Point } from './chart';

// quick synthetic dataset: 18 months of daily prices
function makeSample(days = 540): Point[] {
  const out: Point[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  // go back `days` and walk forward so our "last" is today
  start.setDate(start.getDate() - (days - 1));
  let price = 120;

  for (let i = 0; i < days; i++) {
    // random-ish walk with weekly seasonality bump
    const t = i / 20;
    price += (Math.sin(t) + Math.cos(t / 3)) * 0.6 + (Math.random() - 0.5) * 1.2;
    price = Math.max(5, price);
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({ x: d, y: price });
  }
  return out;
}

export default function Profile() {
  const data = useMemo(() => makeSample(540), []);
  return (
      <React.Fragment>
      <Navigation/>
      <ChartWithRanges allData={data} width={1100} height={420} />
      </React.Fragment>
  );
}
