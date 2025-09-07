// expandablePanel.tsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** A single row inside an expanded panel: image + copy, with side control */
export type PanelSection = {
  copy: React.ReactNode;                        // the text/content for this row
  img?: {
    src: string;
    alt?: string;
    widthPx?: number;                           // desired image column width (default 240)
    /** aspect is enforced to 1:1 globally */
    radiusPx?: number;                          // border radius of the square (default 12)
    style?: React.CSSProperties;                // extra <img> styles
  };
  side?: "left" | "right";                      // which side shows the image (default 'left')
};

export interface CardSpec {
  id: string;
  title: string;
  icon?: React.ReactNode;
  /** Legacy/simple content: still supported when `sections` not provided */
  content?: React.ReactNode;
  /** Optional block shown at top of the panel, before any sections */
  intro?: React.ReactNode;
  /** Explicit paired layout rows (image + copy) */
  sections?: PanelSection[];
  /** Optional class hook to style the content container */
  contentClassName?: string;
  /** Optional per-card override icons */
  indicatorCollapsedSrc?: string;
  indicatorExpandedSrc?: string;
}
export interface ExpandableCardsProps {
  items: CardSpec[];
  columns?: 3 | 4;
  singleOpen?: boolean;
  minColPx?: number;
  /** Global default icons and size */
  indicatorCollapsedSrc?: string;
  indicatorExpandedSrc?: string;
  indicatorSize?: number;
  /** How an open card should occupy the grid */
  openMode?: "fullrow" | "span2";               // default: "fullrow"
  /** Optional fixed height for closed cards (px) to keep grid tidy */
  closedMinBlockSize?: number;                  // e.g., 160
}
/* helper: square, clipped image wrapper enforcing 1:1 */
const SquareImage: React.FC<{
  src: string;
  alt?: string;
  radius?: number;
  imgStyle?: React.CSSProperties;
}> = ({ src, alt = "", radius = 12, imgStyle }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      aspectRatio: "1 / 1",      // ← enforce square
      borderRadius: radius,
      overflow: "hidden",
    }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",       // fill & crop to the square
        display: "block",
        ...imgStyle,
      }}
    />
  </div>
);

export default function ExpandableCards({
  items,
  columns = 4,
  singleOpen = false,
  minColPx = 180,
  indicatorCollapsedSrc,
  indicatorExpandedSrc,
  indicatorSize = 20,
  openMode = "fullrow",
  closedMinBlockSize,
}: ExpandableCardsProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const isOpen = (id: string) => openIds.has(id);
  const isExiting = (id: string) => exitingIds.has(id);

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      const wasOpen = next.has(id);
      if (singleOpen) next.clear();
      if (wasOpen) { setExitingIds(s => new Set(s).add(id)); next.delete(id); }
      else next.add(id);
      return next;
    });
  };

  const panelMotion = useMemo(
    () => ({
      initial:  { opacity: 0, height: 0 },
      animate:  { opacity: 1, height: "auto" as const },
      exit:     { opacity: 0, height: 0 },
      transition: { duration: 0.25, ease: "easeInOut" as const },
    }),
    []
  );

  return (
    <motion.div
      className="xc-grid"
      style={{
        display: "grid",
        gap: 28,
        gridAutoFlow: "dense",
        gridTemplateColumns: `repeat(${columns}, minmax(${minColPx}px, 1fr))`,
        alignItems: "start",                  // ← don't stretch other cards
      }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {items.map(item => {
        const open = isOpen(item.id);
        const keepWide = open || isExiting(item.id); // keep span until exit finishes
        const collapsedSrc = item.indicatorCollapsedSrc ?? indicatorCollapsedSrc;
        const expandedSrc  = item.indicatorExpandedSrc  ?? indicatorExpandedSrc;
        const showExpanded = keepWide;

        return (
          <article
            key={item.id}
            className={`xc-card ${keepWide ? "is-open" : ""}`}
            data-state={open ? "open" : "closed"}
            style={{
              background: "#fff",
              border: "2px solid #ff4d00",
              borderRadius: 14,
              overflow: "hidden",
              // Put the open card on its own row or span two columns
              gridColumn: keepWide
                ? openMode === "fullrow"
                  ? "1 / -1"
                  : "span 2"
                : "auto",
              // keep closed cards compact if desired
              minBlockSize: !keepWide && closedMinBlockSize ? closedMinBlockSize : undefined,
            }}
          >
            {/* Animate only inner wrapper to avoid border-radius distortion */}
            <motion.div
              className="xc-card-inner"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ willChange: "transform,height", translate: "0 0" }}
            >
              {/* Header / trigger */}
              <button
                className="xc-head"
                aria-expanded={open}
                aria-controls={`panel-${item.id}`}
                onClick={() => toggle(item.id)}
                type="button"
                style={{
                  width: "100%",
                  padding: "22px 20px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 12,
                  alignItems: "start",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {item.icon && <span className="xc-ic">{item.icon}</span>}

                <span
                  className="xc-title"
                  style={{
                    fontWeight: 800,
                    lineHeight: 1.1,
                    fontSize: "1rem",
                    overflowWrap: "anywhere",
                    hyphens: "auto",
                  }}
                >
                  {item.title}
                </span>

                {/* Trailing indicator image (cross-fade) */}
                <span
                  className="xc-indicator"
                  aria-hidden="true"
                  style={{ position: "relative", width: indicatorSize, height: indicatorSize, display: "inline-block" }}
                >
                  <span
                    style={{
                      position: "absolute", inset: 0,
                      backgroundImage: collapsedSrc ? `url(${collapsedSrc})` : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      opacity: showExpanded ? 0 : 1,
                      transition: "opacity .15s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute", inset: 0,
                      backgroundImage: expandedSrc ? `url(${expandedSrc})` : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      opacity: showExpanded ? 1 : 0,
                      transition: "opacity .15s ease",
                    }}
                  />
                </span>
              </button>

              {/* Panel body */}
              <AnimatePresence initial={false} onExitComplete={() => setExitingIds(new Set())}>
                {open && (
                  <motion.section
                    id={`panel-${item.id}`}
                    className="xc-panel"
                    key="panel"
                    role="region"
                    aria-label={`${item.title} details`}
                    data-state="open"
                    layout
                    initial={panelMotion.initial}
                    animate={panelMotion.animate}
                    exit={panelMotion.exit}
                    transition={panelMotion.transition}
                    style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,.06)" }}
                  >
                    <div
                      className={`xc-panel-inner ${item.contentClassName ?? ""}`}
                      style={{
                        padding: "18px 20px 22px",
                        minInlineSize: 100,
                        maxInlineSize: "unset",
                        lineHeight: 1.55,
                        color: "#2a2a2a",
                      }}
                    >
                      {/* sections (image+copy rows) OR fallback to content */}
                      {item.sections?.length ? (
                        <div className="xc-sections" style={{ display: "grid", gap: 16 }}>
                          {item.intro && (
                            <div className="xc-intro" style={{ marginBottom: 4 }}>
                              {item.intro}
                            </div>
                          )}

                          {item.sections.map((s, i) => {
                            const col = s.img?.widthPx ?? 240;
                            const grid =
                              s.side === "right"
                                ? `1fr minmax(140px, ${col}px)`
                                : `minmax(140px, ${col}px) 1fr`;
                            return (
                              <div
                                key={i}
                                className={`xc-row ${s.side === "right" ? "right" : "left"}`}
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: grid,
                                  gap: 16,
                                  alignItems: "start",
                                }}
                              >
                                {/* left image (square) */}
                                {s.side !== "right" && s.img && (
                                  <figure style={{ margin: 0 }}>
                                    <SquareImage
                                      src={s.img.src}
                                      alt={s.img.alt}
                                      radius={s.img.radiusPx ?? 12}
                                      imgStyle={s.img.style}
                                    />
                                  </figure>
                                )}

                                {/* copy */}
                                <div className="xc-copy">{s.copy}</div>

                                {/* right image (square) */}
                                {s.side === "right" && s.img && (
                                  <figure style={{ margin: 0 }}>
                                    <SquareImage
                                      src={s.img.src}
                                      alt={s.img.alt}
                                      radius={s.img.radiusPx ?? 12}
                                      imgStyle={s.img.style}
                                    />
                                  </figure>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        item.content ?? null
                      )}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          </article>
        );
      })}
    </motion.div>
  );
}
