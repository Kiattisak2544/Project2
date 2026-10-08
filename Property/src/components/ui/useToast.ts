import { useCallback, useState } from 'react';

export type ToastTone = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
  leaving: boolean;
}

export const TOAST_DURATION = 3500;
const EXIT_DURATION = 300;

let nextId = 1;

// จัดการรายการแจ้งเตือน (Toast) ที่มุมขวาบน แทนการใช้ alert()
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), EXIT_DURATION);
  }, []);

  const notify = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, tone, leaving: false }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss]
  );

  return { toasts, notify, dismiss };
}
