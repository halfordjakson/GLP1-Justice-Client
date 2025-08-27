// Accordion.tsx
import React, { useState, useCallback, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { accordionItems } from '../types/types';
import '../styles/accordion.css';
export function Accordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) =>
    setOpenId(current => (current === id ? null : id));
  return (
    <div className="acc">
      {/*  <button className="spawn-btn" onClick={spawnIcon}>
      <h3> Press Me!</h3>
      </button>
      */}
      <div className="acc-itms">
        {accordionItems.map(item => {
          const isOpen = item.id === openId;
          return (
            <div className="item" key={item.id}>
              <button
                className={`acchdr ${isOpen ? 'open' : ''}`}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
              >
                <h1>{item.title}</h1>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="panel"
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="panel-content">
                      {item.content}
                    </div>
                    <div className="panel-image">
                      <img src={item.imageSrc} alt={item.title} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Accordion;
