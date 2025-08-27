// chart.types.ts
export type X = number | Date;

export interface Point {
  x: X;
  y: number;
}

export type Cursor = {
  x: number;
  y: number;
  domainX: X;
  domainY: number;
};

export type Margin = { top: number; right: number; bottom: number; left: number };
