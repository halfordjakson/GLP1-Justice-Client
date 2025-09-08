// profile.tsx
import { useEffect, useRef, useState } from 'react';
import Navigation from './navigation';
import Footer from './footer';
import ClaimsChart, { type Point } from './chart';
import { SankeyDiagram } from './sankey';
import '../styles/profile.css';

// Synthetic dataset for the point chart
const demoData: Point[] = Array.from({ length: 60 }, (_, i) => ({
  x: new Date(Date.now() - (59 - i) * 60_000),
  y: Math.max(0, 50 + 20 * Math.sin(i / 6) + (Math.random() - 0.5) * 10),
}));

export default function Profile() {
  // Measure only the chart areas (second row of each card)
  const chartBoxRef = useRef<HTMLDivElement>(null);
  const sankeyBoxRef = useRef<HTMLDivElement>(null);

  const [chartSize, setChartSize]   = useState({ w: 0, h: 420 });
  const [sankeySize, setSankeySize] = useState({ w: 0, h: 420 });

  useEffect(() => {
    const el = chartBoxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setChartSize({ w: Math.max(0, width), h: Math.max(0, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sankeyBoxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSankeySize({ w: Math.max(0, width), h: Math.max(0, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Shared heights/margins
  const CARD_HEIGHT = 420; // height for the chart row of each card
  const chartMargin = { top: 16, right: 16, bottom: 28, left: 44 };

  return (
    <>
      <Navigation />

      <div className="pro-r">
        {/* Page header (not a chart title) */}
        <div className="pro-h">
          <div className="pro-t">
            <h2>Profile & Activity</h2>
          </div>
        </div>

        {/* Content column: cards stacked vertically */}
        <div className="pro-cc">
          {/* ── Claim Activity Card ── */}
          <section className="tile-card">
            <header className="tile-header">
              <h2 className="tile-title">Claim Activity</h2>
            </header>

            {/* Measured chart area (row 2) */}
            <div
              ref={chartBoxRef}
              className="tile-chart"
              style={{ height: CARD_HEIGHT }}
            >
              {chartSize.w > 0 && (
                <ClaimsChart
                  data={demoData}
                  width={chartSize.w}
                  height={chartSize.h}
                  margin={chartMargin}
                  accent="#FF4D00"
                  showTicks
                />
              )}
            </div>
          </section>

          {/* ── Sankey Card ── */}
          <section className="tile-card">
            <header className="tile-header">
              <h2 className="tile-title">Claims Breakdown</h2>
            </header>

            {/* Measured diagram area (row 2) */}
            <div
              ref={sankeyBoxRef}
              className="tile-chart"
              style={{ height: CARD_HEIGHT }}
            >
              {sankeySize.w > 0 && (
                <SankeyDiagram
                  width={sankeySize.w}
                  height={sankeySize.h}
                  margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                  compact
                  insideLabels
                />
              )}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
