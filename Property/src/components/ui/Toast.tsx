import { TOAST_DURATION, type ToastItem, type ToastTone } from './useToast';

const toneStyles: Record<ToastTone, { icon: string; badge: string; progress: string }> = {
  success: { icon: '✓', badge: 'bg-tertiary text-on-tertiary', progress: 'bg-tertiary-fixed' },
  error: { icon: '!', badge: 'bg-error text-on-error', progress: 'bg-error' },
  info: { icon: 'i', badge: 'bg-primary-container text-on-primary-container', progress: 'bg-secondary' },
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
            className={`pointer-events-auto relative overflow-hidden flex items-center gap-3 rounded-xl bg-inverse-surface text-inverse-on-surface px-4 py-3 text-xs shadow-2xl border border-outline-variant/30 ${
              t.leaving ? 'animate-toast-out' : 'animate-toast-in'
            }`}
          >
            <span
              className={`w-6 h-6 shrink-0 rounded-full ${style.badge} flex items-center justify-center font-bold text-xs`}
            >
              {style.icon}
            </span>
            <span className="flex-1 leading-relaxed">{t.message}</span>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              className="text-inverse-on-surface/60 hover:text-inverse-on-surface transition cursor-pointer"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
            {/* Progress bar */}
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full origin-left ${style.progress} animate-progress`}
              style={{ animationDuration: `${TOAST_DURATION}ms` }}
            />
          </div>
        );
      })}
    </div>
  );
}
