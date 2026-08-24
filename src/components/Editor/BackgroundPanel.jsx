import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

const PRESET_COLORS = ['#F8FAFC', '#EFF6FF', '#0F1E3D', '#0B1B33', '#FDE68A', '#FCA5A5', '#EAF4FF', '#FFFFFF'];
const PRESET_GRADIENTS = [
  ['#3B5BFF', '#8B5CF6'],
  ['#0B1B33', '#122B52'],
  ['#F472B6', '#818CF8'],
  ['#38BDF8', '#2563EB'],
];

export default function BackgroundPanel() {
  const background = useEditorStore((s) => s.background);
  const setBackground = useEditorStore((s) => s.setBackground);
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBackground({ type: 'image', image: reader.result });
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-semibold text-ink/70 mb-2.5">Solid Color</h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="color"
            value={background.type === 'solid' ? background.color : '#F8FAFC'}
            onChange={(e) => setBackground({ type: 'solid', color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-line cursor-pointer p-0.5"
            aria-label="Background color"
          />
          <span className="text-sm text-muted">Pick a custom color</span>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setBackground({ type: 'solid', color: c })}
              aria-label={`Set background to ${c}`}
              className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105 ${
                background.type === 'solid' && background.color === c ? 'border-primary' : 'border-line'
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-ink/70 mb-2.5">Gradient</h3>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_GRADIENTS.map((g) => (
            <button
              key={g.join('-')}
              onClick={() => setBackground({ type: 'gradient', gradient: g })}
              aria-label="Set gradient background"
              className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105 ${
                background.type === 'gradient' && background.gradient?.[0] === g[0] ? 'border-primary' : 'border-line'
              }`}
              style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-ink/70 mb-2.5">Image Background</h3>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 text-center border-2 border-dashed border-line rounded-xl py-6 px-4 hover:border-primary/50 hover:bg-lightblue transition-colors"
        >
          <Upload size={20} className="text-primary" />
          <span className="text-sm font-semibold text-ink">Upload Background</span>
        </button>
      </div>
    </div>
  );
}
