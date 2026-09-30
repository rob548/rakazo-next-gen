import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastItem {
  id: number;
  message: string;
}

type Listener = (t: ToastItem) => void;
const listeners = new Set<Listener>();
let nextId = 1;

/** Fire a global toast: `toast("copied — paste it in your terminal")` */
export function toast(message: string) {
  const item = { id: nextId++, message };
  listeners.forEach((l) => l(item));
}

/** Mount once (in Layout). Bottom-center dark pill, auto-dismiss 2.4s. */
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener: Listener = (item) => {
      setItems((prev) => [...prev.slice(-2), item]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== item.id));
      }, 2400);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 rounded-full border border-hairline-dark bg-carbon-2 px-4 py-2 font-mono text-[13px] text-bone shadow-lg"
            role="status"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
