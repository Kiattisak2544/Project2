import { useEffect, useState, type ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  /** Can be passed as a render prop to allow internal close buttons to animate: {(close) => <button onClick={close}>} */
  children: ReactNode | ((close: () => void) => ReactNode);
  maxWidth?: string;
}

/**
 * Animated Modal Dialog component.
 * Callers should conditionally render like {open && <Modal ... />}
 */
export default function Modal({ onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClosing(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs ${
        closing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      onClick={close}
      onAnimationEnd={(e) => {
        if (closing && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 ${
          closing ? 'animate-scale-out' : 'animate-scale-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  );
}
