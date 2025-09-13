// expandablePanel.tsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** A single row inside an expanded panel: image + copy, with side control */
export type PanelSection = {
  copy: React.ReactNode;
  img?: {
    src: string;
    alt?: string;
    widthPx?: number; // desired image column width (default 240)
    radiusPx?: number;
    style?: React.CSSProperties;
  };
  side?: "left" | "right";
};

export interface CardSpec {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  intro?: React.ReactNode;
  sections?: PanelSection[];
  contentClassName?: string;
  indicatorCollapsedSrc?: string;
  indicatorExpandedSrc?: string;
}

export interface ExpandableCardsProps {
  items: CardSpec[];
  columns?: 3 | 4;
  singleOpen?: boolean;
  minColPx?: number;
  indicatorCollapsedSrc?: string;
  indicatorExpandedSrc?: string;
  indicatorSize?: number;
  openMode?: "fullrow" | "span2";
  closedMinBlockSize?: number;
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
      aspectRatio: "1 / 1",
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
        objectFit: "cover",
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
  const [pageByCard, setPageByCard] = useState<Record<string, number>>({});

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isOpen = (id: string) => openIds.has(id);
  const isExiting = (id: string) => exitingIds.has(id);

  // Scroll helper
  const scrollToCard = (id: string) => {
    const el = cardRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20; // optional offset
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scroll whenever a card's page changes
  useEffect(() => {
    Object.keys(pageByCard).forEach((id) => {
      if (isOpen(id)) {
        scrollToCard(id);
      }
    });
  }, [pageByCard]);

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      const wasOpen = next.has(id);
      if (singleOpen) next.clear();
      if (wasOpen) {
        setExitingIds(s => new Set(s).add(id));
        next.delete(id);
      } else {
        next.add(id);
        setPageByCard(p => ({ ...p, [id]: 0 })); // reset page on open
      }
      return next;
    });
  };

  const panelMotion = useMemo(
    () => ({
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" as const },
      exit: { opacity: 0, height: 0 },
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
        alignItems: "start",
      }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {items.map(item => {
        const open = isOpen(item.id);
        const keepWide = open || isExiting(item.id);
        const collapsedSrc = item.indicatorCollapsedSrc ?? indicatorCollapsedSrc;
        const expandedSrc = item.indicatorExpandedSrc ?? indicatorExpandedSrc;
        const showExpanded = keepWide;

        const sections = item.sections ?? [];
        const sectionsPerPage = 3;
        const totalPages = Math.ceil(sections.length / sectionsPerPage);
        const currentPage = pageByCard[item.id] ?? 0;
        const startIdx = currentPage * sectionsPerPage;
        const currentSections = sections.slice(startIdx, startIdx + sectionsPerPage);

        return (
          <article
            key={item.id}
            ref={el => { cardRefs.current[item.id] = el as HTMLDivElement | null; }}
            className={`xc-card ${keepWide ? "is-open" : ""}`}
            data-state={open ? "open" : "closed"}
            style={{
              background: "#fff",
              border: "2px solid #ff4d00",
              borderRadius: 14,
              overflow: "hidden",
              gridColumn: keepWide
                ? openMode === "fullrow"
                  ? "1 / -1"
                  : "span 2"
                : "auto",
              minBlockSize: !keepWide && closedMinBlockSize ? closedMinBlockSize : undefined,
            }}
          >
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
                {/* Trailing indicator */}
                <span
                  className="xc-indicator"
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: indicatorSize,
                    height: indicatorSize,
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
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
                      position: "absolute",
                      inset: 0,
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
              <AnimatePresence
                initial={false}
                onExitComplete={() => setExitingIds(new Set())}
              >
                {open && (
                  <motion.section
                    id={`panel-${item.id}`}
                    className="xc-panel"
                    key="panel"
                    role="region"
                    aria-label={`${item.title} details`}
                    layout
                    initial={panelMotion.initial}
                    animate={panelMotion.animate}
                    exit={panelMotion.exit}
                    transition={panelMotion.transition}
                    style={{
                      overflow: "hidden",
                      borderTop: "1px solid rgba(0,0,0,.06)",
                    }}
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
                      {sections.length ? (
                        <div className="xc-sections" style={{ display: "grid", gap: 16 }}>
                          {totalPages > 1 && (
                            <div
                              style={{
                                marginTop: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <button
                                className="btn-pagi"
                                onClick={() =>
                                  setPageByCard(p => ({
                                    ...p,
                                    [item.id]: currentPage === 0 ? totalPages - 1 : currentPage - 1,
                                  }))
                                }
                              >
                                <h3>Previous</h3>
                              </button>
                              <span>
                                Page {currentPage + 1} of {totalPages}
                              </span>
                              <button
                                className="btn-pagi"
                                onClick={() =>
                                  setPageByCard(p => ({
                                    ...p,
                                    [item.id]: currentPage === totalPages - 1 ? 0 : currentPage + 1,
                                  }))
                                }
                              >
                                <h3>Next</h3>
                              </button>
                            </div>
                          )}
                          {item.intro && (
                            <div className="xc-intro" style={{ marginBottom: 4 }}>
                              {item.intro}
                            </div>
                          )}

                          {currentSections.map((s, i) => {
                            const col = s.img?.widthPx ?? 240;
                            const grid = s.side === "right"
                              ? `1fr minmax(140px, ${col}px)`
                              : `minmax(140px, ${col}px) 1fr`;
                            return (
                              <div
                                key={i}
                                className={`xc-row ${s.side === "right" ? "right" : "left"}`}
                                style={{ display: "grid", gridTemplateColumns: grid, gap: 16, alignItems: "start" }}
                              >
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

                                <div className="xc-copy">{s.copy}</div>

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

                          {/* Pagination controls */}
                          {totalPages > 1 && (
                            <div
                              style={{
                                marginTop: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <button
                                className="btn-pagi"
                                onClick={() =>
                                  setPageByCard(p => ({
                                    ...p,
                                    [item.id]: currentPage === 0 ? totalPages - 1 : currentPage - 1,
                                  }))
                                }
                              >
                                <h3>Previous</h3>
                              </button>
                              <span>
                                Page {currentPage + 1} of {totalPages}
                              </span>
                              <button
                                className="btn-pagi"
                                onClick={() =>
                                  setPageByCard(p => ({
                                    ...p,
                                    [item.id]: currentPage === totalPages - 1 ? 0 : currentPage + 1,
                                  }))
                                }
                              >
                                <h3>Next</h3>
                              </button>
                            </div>
                          )}
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
