import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { FONTS, FONT_WEIGHTS } from '../../data/fonts';
import { useEditorStore } from '../../store/editorStore';

const ALIGNS = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight },
];

export default function TextPanel({ elm }) {
  const updateElement = useEditorStore((s) => s.updateElement);
  const updateElementLive = useEditorStore((s) => s.updateElementLive);
  const beginChange = useEditorStore((s) => s.beginChange);
  const persist = useEditorStore((s) => s.persist);

  function liveField(patch) {
    updateElementLive(elm.id, patch);
  }
  function commitField() {
    persist();
  }
  function startLive() {
    beginChange();
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Content</label>
        <textarea
          value={elm.text}
          onChange={(e) => updateElement(elm.id, { text: e.target.value }, { commit: false })}
          onFocus={startLive}
          onBlur={commitField}
          rows={3}
          className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Font</label>
        <select
          value={elm.fontFamily}
          onChange={(e) => updateElement(elm.id, { fontFamily: e.target.value })}
          className="w-full text-sm rounded-lg border border-line px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {FONTS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Font Size ({elm.fontSize})</label>
          <input
            type="range"
            min={8}
            max={140}
            value={elm.fontSize}
            onChange={(e) => liveField({ fontSize: Number(e.target.value) })}
            onMouseDown={startLive}
            onMouseUp={commitField}
            onTouchStart={startLive}
            onTouchEnd={commitField}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Weight</label>
          <select
            value={elm.fontWeight}
            onChange={(e) => updateElement(elm.id, { fontWeight: e.target.value })}
            className="w-full text-sm rounded-lg border border-line px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Alignment</label>
        <div className="flex gap-2">
          {ALIGNS.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => updateElement(elm.id, { align: value })}
              aria-label={`Align ${value}`}
              aria-pressed={elm.align === value}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg border transition-colors ${
                elm.align === value ? 'bg-primary text-white border-primary' : 'border-line text-ink/70 hover:bg-lightblue'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={elm.color}
            onChange={(e) => updateElement(elm.id, { color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-line cursor-pointer p-0.5"
            aria-label="Text color"
          />
          <input
            type="text"
            value={elm.color}
            onChange={(e) => updateElement(elm.id, { color: e.target.value })}
            className="flex-1 text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Letter Spacing</label>
          <input
            type="range"
            min={-2}
            max={12}
            step={0.5}
            value={elm.letterSpacing || 0}
            onChange={(e) => liveField({ letterSpacing: Number(e.target.value) })}
            onMouseDown={startLive}
            onMouseUp={commitField}
            onTouchStart={startLive}
            onTouchEnd={commitField}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Line Height</label>
          <input
            type="range"
            min={0.8}
            max={2.4}
            step={0.05}
            value={elm.lineHeight || 1.2}
            onChange={(e) => liveField({ lineHeight: Number(e.target.value) })}
            onMouseDown={startLive}
            onMouseUp={commitField}
            onTouchStart={startLive}
            onTouchEnd={commitField}
            className="w-full accent-primary"
          />
        </div>
      </div>
    </div>
  );
}
