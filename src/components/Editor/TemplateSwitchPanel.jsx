import { TEMPLATES } from '../../data/templates';
import TemplatePreview from '../TemplatePreview';
import { useEditorStore } from '../../store/editorStore';
import { useToastStore } from '../../store/toastStore';

export default function TemplateSwitchPanel() {
  const templateId = useEditorStore((s) => s.templateId);
  const switchTemplate = useEditorStore((s) => s.switchTemplate);
  const showToast = useToastStore((s) => s.showToast);

  function handleSwitch(t) {
    if (t.id === templateId) return;
    if (window.confirm(`Switch to "${t.name}"? Your current layout will be replaced (you can undo).`)) {
      switchTemplate(t.id);
      showToast(`Switched to ${t.name}.`);
    }
  }

  return (
    <div>
      <p className="text-xs text-muted mb-3">Switch to a different starting template.</p>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSwitch(t)}
            className={`rounded-xl overflow-hidden border-2 transition-all hover:-translate-y-0.5 ${
              t.id === templateId ? 'border-primary shadow-sm' : 'border-line hover:border-primary/40'
            }`}
          >
            <TemplatePreview template={t} />
            <span className="block text-[11px] font-medium text-ink py-1.5 px-1 bg-white truncate">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
