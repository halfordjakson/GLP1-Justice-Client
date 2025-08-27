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
  background?: string;
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  width,
  height,
  margin = { top: 20, right: 180, bottom: 20, left: 180 },
  data,
  linkColors = [
    "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F", "#9B5DE5",
    "#00BBF9", "#F15BB5", "#00F5D4", "#FEE440", "#FF006E",
  ],
  nodeColor = "#003049",
  background = "#ffffff",
}) => {
  // Example dataset if no data is provided
  const sampleData = useMemo(
    () => ({
      nodes: [
        { name: "Wages" },      // 0
        { name: "Other" },      // 1
        { name: "Budget" },     // 2
        { name: "Taxes" },      // 3
        { name: "Housing" },    // 4
        { name: "Food" },       // 5
        { name: "Transportation" }, // 6
        { name: "Other Necessities" }, // 7
        { name: "Savings" },    // 8
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

  const iw = Math.max(0, width - margin.left - margin.right);
  const ih = Math.max(0, height - margin.top - margin.bottom);

  const { layoutNodes, layoutLinks } = useMemo(() => {
    const sankeyGen = d3Sankey<NodeDatum, LinkDatum>()
      .nodeWidth(18)
      .nodePadding(40)
      .nodeAlign(sankeyJustify) // flush columns, like SankeyMATIC
      .extent([[0, 0], [iw, ih]]);

    const { nodes: nRaw, links: lRaw } = sankeyGen({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    });

    type LaidOutNode = SankeyNode<NodeDatum, LinkDatum> & {
      x0: number; x1: number; y0: number; y1: number;
      value: number;
    };
    type LaidOutLink = SankeyLink<NodeDatum, LinkDatum> & { width: number };

    return {
      layoutNodes: nRaw as LaidOutNode[],
      layoutLinks: lRaw as LaidOutLink[],
    };
  }, [nodes, links, iw, ih]);

  return (
    <svg width={width} height={height} style={{ display: "block", background }}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Links */}
        <g fill="none" strokeOpacity={0.7}>
          {layoutLinks.map((link, i) => {
            const pathGen = sankeyLinkHorizontal<
              (typeof layoutNodes)[number],
              (typeof layoutLinks)[number]
            >();
            const d = pathGen(link) || "";
            const stroke = linkColors[i % linkColors.length];
            const strokeWidth = Math.max(1, link.width);
            return (
              <path key={i} d={d} stroke={stroke} strokeWidth={strokeWidth}>
                <title>
                  {`${(link.source as any).name} → ${(link.target as any).name}: ${link.value}`}
                </title>
              </path>
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {layoutNodes.map((node, i) => {
            const { x0, x1, y0, y1, name, value } = node;
            const w = Math.max(1, x1 - x0);
            const h = Math.max(1, y1 - y0);

            return (
              <g key={i}>
                <rect
                  x={x0}
                  y={y0}
                  width={w}
                  height={h}
                  fill={nodeColor}
                  opacity={0.9}
                  stroke="#000"
                >
                  <title>{`${name}: ${value}`}</title>
                </rect>

                {/* Node label */}
                <text
                  x={x0 < iw / 2 ? x0 - 8 : x1 + 8}
                  y={(y0 + y1) / 2}
                  dy="0.35em"
                  textAnchor={x0 < iw / 2 ? "end" : "start"}
                  fontSize={13}
                  fill="#111"
                >
                  {`${name} ${value}`}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};
