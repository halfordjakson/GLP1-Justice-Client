import React, { useMemo, useState } from 'react';
import { timeFormat } from 'd3';
import CoinbaseStyleChart, { type Cursor, type Point } from './chart';

type RangeKey = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';

const DUR_MS: Record<Exclude<RangeKey, 'ALL'>, number> = {
  '1H': 60 * 60 * 1000,
  '1D': 24 * 60 * 60 * 1000,
  '1W': 7 * 24 * 60 * 60 * 1000,
  '1M': 30 * 24 * 60 * 60 * 1000,     // simple month; swap for calendar math if you prefer
  '1Y': 365 * 24 * 60 * 60 * 1000,
};

const fmtMoney = (v: number) =>
  v >= 1000
    ? v.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : v.toFixed(2);
const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
const fmtHeaderDate = timeFormat('%a, %b %-d, %Y, %-I:%M %p');

function filterByRange(all: Point[], key: RangeKey): Point[] {
  if (!all.length || key === 'ALL') return all;
  const last = all[all.length - 1];
  if (!(last.x instanceof Date)) return all; // ranges assume Date x
  const from = +last.x - DUR_MS[key];
  return all.filter(d => +(d.x as Date) >= from);
}

function RangeButtons({
  value, onChange,
}: { value: RangeKey; onChange: (k: RangeKey) => void }) {
  const keys: RangeKey[] = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {keys.map(k => (
        <button
          key={k}
          onClick={() => onChange(k)}
          aria-pressed={value === k}
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            border: value === k ? '1px solid #2a47ff' : '1px solid #2A2F3A',
            background: value === k ? 'rgba(42,71,255,0.12)' : 'transparent',
            color: value === k ? '#e6e8eb' : '#9aa0ad',
            fontWeight: 700,
            letterSpacing: 0.2,
            cursor: 'pointer',
          }}
        >
          {k}
        </button>
      ))}
    </div>
  );
}

export default function ChartWithRanges({
  allData,
  width = 1100,
  height = 420,
  accent = '#9B5DFF',
}: {
  allData: Point[];
  width?: number;
  height?: number;
  accent?: string;
}) {
  const [range, setRange] = useState<RangeKey>('ALL');
  const [cursor, setCursor] = useState<Cursor | null>(null);

  const data = useMemo(() => filterByRange(allData, range), [allData, range]);

  const first = data[0];
  const last = data[data.length - 1];

  const price = cursor ? cursor.domainY : last?.y ?? 0;
  const delta = last && first ? last.y - first.y : 0;
  const pct = last && first && first.y !== 0 ? (delta / first.y) * 100 : 0;

  const dateText =
    cursor && cursor.domainX instanceof Date
      ? fmtHeaderDate(cursor.domainX as Date)
      : last && last.x instanceof Date
      ? fmtHeaderDate(last.x as Date)
      : '';

  return (
    <div style={{ position: 'relative', width, margin: '0 auto' }}>
      {/* Coinbase-like header overlay */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Left: price + change */}
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#E6E8EB', lineHeight: 1 }}>
            ${fmtMoney(price)}
          </div>
          {first && last && (
            <div
              style={{
                marginTop: 4,
                color: delta >= 0 ? '#27C07D' : '#F05C60',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {`${delta >= 0 ? '↑' : '↓'} $${fmtMoney(Math.abs(delta))} (${fmtPct(Math.abs(pct))})`}
            </div>
          )}
        </div>

        {/* Center: date above the manifold */}
        <div
          style={{
            color: '#C7CBD8',
            fontSize: 16,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {dateText}
        </div>

        {/* Right: range selector (pointer events enabled) */}
        <div style={{ pointerEvents: 'auto' }}>
          <RangeButtons value={range} onChange={setRange} />
        </div>
      </div>

      {/* Chart */}
      <CoinbaseStyleChart
        data={data}
        width={width}
        height={height}
        margin={{ top: 64, right: 16, bottom: 44, left: 16 }}
        accent={accent}
        showTicks
        showSplitLine={false}          // keep off unless you pass a splitX and set this true
        onCursorChange={setCursor}
      />
    </div>
  );
}
