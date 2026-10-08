import { TOAST_DURATION, type ToastItem, type ToastTone } from './useToast';

const toneStyles: Record<ToastTone, { icon: string; accent: string }> = {
  success: { icon: '✓', accent: 'from-emerald-400 to-teal-500' },
  error: { icon: '!', accent: 'from-rose-400 to-red-500' },
  info: { icon: 'i', accent: 'from-blue-400 to-indigo-500' },
};

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

export default function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const style = toneStyles[t.tone];
        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto relative overflow-hidden flex items-center gap-3 rounded-xl bg-slate-900/95 text-white px-4 py-3 text-xs shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 ${
              t.leaving ? 'animate-toast-out' : 'animate-toast-in'
            }`}
          >
            <span
              className={`w-6 h-6 shrink-0 rounded-full bg-linear-to-br ${style.accent} flex items-center justify-center font-bold`}
            >
              {style.icon}
            </span>
            <span className="flex-1 leading-relaxed">{t.message}</span>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              className="text-white/50 hover:text-white transition cursor-pointer"
              aria-label="ปิดการแจ้งเตือน"
            >
              ✕
            </button>
            {/* แถบเวลานับถอยหลัง */}
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-linear-to-r ${style.accent} animate-progress`}
              style={{ animationDuration: `${TOAST_DURATION}ms` }}
            />
          </div>
        );
      })}
    </div>
  );
}
