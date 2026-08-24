import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES = {
  success: 'bg-white border-line text-ink [&_svg]:text-primary',
  error: 'bg-white border-red-200 text-ink [&_svg]:text-red-500',
  info: 'bg-white border-line text-ink [&_svg]:text-primary',
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const dismissToast = useToastStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[999] flex flex-col gap-2 w-[min(360px,calc(100vw-2rem))]"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div
            key={t.id}
            className={`animate-toast-in flex items-start gap-3 rounded-xl border shadow-lg px-4 py-3 ${STYLES[t.type] || STYLES.info}`}
          >
            <Icon size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium flex-1">{t.message}</p>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss notification"
              className="text-muted hover:text-ink transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
