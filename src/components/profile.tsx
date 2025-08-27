import React, { useEffect, useRef, useState } from 'react';
import Navigation from './navigation';
import Footer from "./footer";
import ClaimsChart, { type Point } from './chart';
import { SankeyDiagram } from './sankey';
import '../styles/profile.css';

// quick synthetic dataset
const demoData: Point[] = Array.from({ length: 60 }, (_, i) => ({
  x: new Date(Date.now() - (59 - i) * 60_000), // per minute
  y: Math.max(0, 50 + 20 * Math.sin(i / 6) + (Math.random() - 0.5) * 10),
}));

export default function Profile() {
  // Measure ONLY the chart box (not the wrapper that has the <h1>)
  const chartBoxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 420 });

  useEffect(() => {
    const el = chartBoxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(0, width), h: Math.max(0, height) }); // chart box drives height
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const margin = { top: 16, right: 16, bottom: 28, left: 44 };

  return (
    <React.Fragment>
      <Navigation />
      <div className="pro-r">
         <SankeyDiagram
   width={980}
   height={520}
   data={{
     nodes: [
       { name: "Total Claims" },
       { name: "Technology" },
       { name: "Health" },
       { name: "Finance" },
       { name: "Sub-Tech A" },
     ],
     links: [
       { source: 0, target: 1, value: 40 },
       { source: 0, target: 2, value: 35 },
       { source: 0, target: 3, value: 25 },
       { source: 1, target: 4, value: 12 },
     ],
   }}
 />
        <div className="pro-dec"></div>
        <div className="pro-h">
          <div className="pro-t">
            <h1>Profile & Activity</h1>
          </div>
        </div>

        <div className="pro-cc">
          <div
            className="pro-tls"
            style={{
              // make the tile a two-row grid: title + chart
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
              background: '#0f1115',
              borderRadius: 16,
              padding: '12px',
              gap: 8,
            }}
          >
            <div className="pro-t">
              <h1 style={{ margin: 0, color: "white", fontFamily: "Work Sans" }}>Claim Activity</h1>
            </div>

            {/* Dedicated chart box with fixed height -> this is what we measure */}
            <div
              ref={chartBoxRef}
              className="tile-chart"
              style={{
                width: '100%',
                height: 420,        // pick your target (or clamp/ratio if you prefer)
                minHeight: 0,       // important inside grid/flex to allow shrinking
                boxSizing: 'border-box',
              }}
            >
              {size.w > 0 && (
                <ClaimsChart
                  data={demoData}
                  width={size.w}
                  height={size.h}   // equal to the chart box height
                  margin={margin}
                  accent="#FF4D00"
                  showTicks
                />
              )}
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
