import { useEffect, useState, type ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  /** ส่งเป็นฟังก์ชันได้ เพื่อให้ปุ่มด้านในสั่งปิดแบบมีแอนิเมชัน เช่น {(close) => <button onClick={close}>} */
  children: ReactNode | ((close: () => void) => ReactNode);
  maxWidth?: string;
}

/**
 * หน้าต่าง Modal ที่มีแอนิเมชันทั้งตอนเปิดและปิด
 * ผู้เรียกควร render แบบมีเงื่อนไข เช่น {open && <Modal ... />}
 * เมื่อสั่งปิด จะเล่นแอนิเมชันจบก่อนแล้วจึงเรียก onClose
 */
export default function Modal({ onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);

  // ปิดด้วยปุ่ม Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClosing(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm ${
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
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl shadow-blue-950/20 ring-1 ring-slate-900/5 ${
          closing ? 'animate-scale-out' : 'animate-scale-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  );
}
