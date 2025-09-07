// src/components/SankeyDiagram.tsx
import React, { useMemo } from "react";
import {
  sankey as d3Sankey,
  sankeyLinkHorizontal,
  sankeyJustify,
  type SankeyNode,
  type SankeyLink,
} from "d3-sankey";

type NodeDatum = { name: string };
type LinkDatum = { source: number; target: number; value: number };

export interface SankeyDiagramProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  data?: { nodes: NodeDatum[]; links: LinkDatum[] };
  linkColors?: string[];
  nodeColor?: string;
  cardBackground?: string;
  cardRadius?: number;
  insideLabels?: boolean;        // prefer inside; falls back outside if needed
  compact?: boolean;
  labelGutterLeft?: number;      // px reserved for outside labels (left)
  labelGutterRight?: number;     // px reserved for outside labels (right)
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  width,
  height,
  margin = { top: 16, right: 16, bottom: 16, left: 16 },
  data,
  linkColors = [
    "#E07A5F","#FF9900","#FFE066","#CC0000",
    "#FF3300","#FF8000","#FFB300","#FF9900",
    "#FFB300","#FFCC33",
  ],
  nodeColor = "#003049",
  cardBackground = "#F8F9FA",
  cardRadius = 16,
  insideLabels = true,
  compact = true,
  labelGutterLeft = 84,
  labelGutterRight = 120,
}) => {
  // Sample data if none provided
  const sampleData = useMemo(
    () => ({
      nodes: [
        { name: "Wages" }, { name: "Other" }, { name: "Budget" },
        { name: "Taxes" }, { name: "Housing" }, { name: "Food" },
        { name: "Transportation" }, { name: "Other Necessities" }, { name: "Savings" },
      ],
      links: [
        { source: 0, target: 2, value: 1500 },
        { source: 1, target: 2, value: 250 },
        { source: 2, target: 3, value: 450 },
        { source: 2, target: 4, value: 420 },
        { source: 2, target: 5, value: 400 },
        { source: 2, target: 6, value: 255 },
        { source: 2, target: 7, value: 160 },
        { source: 2, target: 8, value: 65 },
      ],
    }),
    []
  );
  const { nodes, links } = data ?? sampleData;

  // Reserve gutters so outside labels never clip on card edges
  const leftPad  = margin.left  + labelGutterLeft;
  const rightPad = margin.right + labelGutterRight;
  const topPad   = margin.top;
  const botPad   = margin.bottom;

  // Inner plot size (links/nodes live only here)
  const iw = Math.max(0, width  - leftPad - rightPad);
  const ih = Math.max(0, height - topPad  - botPad);

  // Compact tuning
  const BASE_W = 980, BASE_H = 420;
  const scale = Math.min(iw / BASE_W, ih / BASE_H);
  const nodeWidth   = (compact ? 12 : 18) * Math.max(0.8, scale || 1);
  const nodePadding = (compact ? 20 : 40) * Math.max(0.8, scale || 1);
  const fontSize    = Math.max(10, Math.round((compact ? 11 : 13) * Math.max(0.8, scale || 1)));

  const { layoutNodes, layoutLinks, maxDepth } = useMemo(() => {
    const sankeyGen = d3Sankey<NodeDatum, LinkDatum>()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeAlign(sankeyJustify)
      .extent([[0, 0], [iw, ih]]);

    const { nodes: nRaw, links: lRaw } = sankeyGen({
      nodes: nodes.map(d => ({ ...d })),
      links: links.map(d => ({ ...d })),
    });

    // @ts-ignore
    const dMax = Math.max(...(nRaw as any[]).map(n => n.depth ?? 0));

    type LaidOutNode = SankeyNode<NodeDatum, LinkDatum> & {
      x0: number; x1: number; y0: number; y1: number; value: number; depth?: number;
    };
    type LaidOutLink = SankeyLink<NodeDatum, LinkDatum> & { width: number };

    return {
      layoutNodes: nRaw as LaidOutNode[],
      layoutLinks: lRaw as LaidOutLink[],
      maxDepth: dMax,
    };
  }, [nodes, links, iw, ih, nodeWidth, nodePadding]);

  const clipId = useMemo(() => `clip-${Math.random().toString(36).slice(2)}`, []);

  // Cheap text width estimator (good enough for placement decisions)
  const textWidth = (s: string, fs: number) => s.length * fs * 0.58;

  // Clamp helper within the full card (including gutters)
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: cardBackground,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
        shapeRendering="geometricPrecision"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={0} y={0} width={width} height={height} rx={cardRadius} ry={cardRadius} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {/* shift so x=0 aligns to the left gutter start */}
          <g transform={`translate(${leftPad},${topPad})`}>
            {/* Links */}
            <g fill="none" strokeOpacity={0.9}>
              {layoutLinks.map((link, i) => {
                const d = sankeyLinkHorizontal<any, any>()(link) || "";
                const stroke = linkColors[i % linkColors.length];
                return <path key={i} d={d} stroke={stroke} strokeWidth={Math.max(1, link.width)} />;
              })}
            </g>

            {/* Nodes + smart labels */}
            <g>
              {layoutNodes.map((node, i) => {
                const { x0, x1, y0, y1, value } = node;
                const name = (node as any).name as string;
                const w = Math.max(1, x1 - x0);
                const h = Math.max(1, y1 - y0);

                // prefer inside, but fall back to gutter if text won't fit
                const label = `${name} ${value}`;
                const fitsInside = insideLabels && textWidth(label, fontSize) <= (w - 8);

                // which column?
                // @ts-ignore
                const depth = node.depth ?? 0;
                const isLeftCol  = depth === 0 || x0 <= 1;
                const isRightCol = depth === maxDepth || x1 >= iw - 1;

                let lx = (x0 + x1) / 2;            // default to center
                let ly = (y0 + y1) / 2;
                let anchor: "start" | "middle" | "end" = "middle";
                let fill = "#fff";

                if (!fitsInside) {
                  if (isLeftCol) {
                    // place in LEFT gutter near node
                    lx = x0 - 8;
                    anchor = "end";
                    fill = "#E6E8EB";
                    // Clamp within left gutter bounds
                    lx = clamp(lx, -labelGutterLeft + 4, x0 - 4);
                  } else if (isRightCol) {
                    // place in RIGHT gutter near node
                    lx = x1 + 8;
                    anchor = "start";
                    fill = "#E6E8EB";
                    lx = clamp(lx, x1 + 4, iw + labelGutterRight - 4);
                  } else {
                    // middle columns: keep centered (best we can do)
                    anchor = "middle";
                  }
                }

                return (
                  <g key={i}>
                    <rect x={x0} y={y0} width={w} height={h} rx={2} ry={2} fill={nodeColor} opacity={0.9} />
                    <text
                      x={lx}
                      y={ly}
                      dy="0.35em"
                      textAnchor={anchor}
                      fontSize={fontSize}
                      fill={fill}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
