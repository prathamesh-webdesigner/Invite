import { useRef } from 'react';
import { Upload, RotateCw } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useToastStore } from '../../store/toastStore';

export default function ImagePanel({ elm }) {
  const fileRef = useRef(null);
  const updateElement = useEditorStore((s) => s.updateElement);
  const updateElementLive = useEditorStore((s) => s.updateElementLive);
  const beginChange = useEditorStore((s) => s.beginChange);
  const persist = useEditorStore((s) => s.persist);
  const showToast = useToastStore((s) => s.showToast);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateElement(elm.id, { src: reader.result });
      showToast('Image updated.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const isCircle = elm.borderRadius >= 999;

  return (
    <div className="flex flex-col gap-5">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div className="flex gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold bg-primary text-white rounded-lg py-2.5 hover:bg-primary-dark transition-colors"
        >
          <Upload size={15} /> Replace Image
        </button>
      </div>

      <div>
        <label className="flex items-center justify-between text-xs font-semibold text-ink/70 mb-1.5">
          <span>Border Radius</span>
          <button
            onClick={() => updateElement(elm.id, { borderRadius: isCircle ? 12 : 999 })}
            className="text-primary hover:underline"
          >
            {isCircle ? 'Make square' : 'Make circle'}
          </button>
        </label>
        <input
          type="range"
          min={0}
          max={200}
          value={Math.min(elm.borderRadius, 200)}
          onChange={(e) => updateElement(elm.id, { borderRadius: Number(e.target.value) })}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Opacity ({Math.round(elm.opacity * 100)}%)</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={elm.opacity}
          onChange={(e) => updateElementLive(elm.id, { opacity: Number(e.target.value) })}
          onMouseDown={beginChange}
          onMouseUp={persist}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 flex items-center gap-1.5">
          <RotateCw size={13} /> Rotation ({Math.round(elm.rotation)}°)
        </label>
        <input
          type="range"
          min={-180}
          max={180}
          value={elm.rotation}
          onChange={(e) => updateElementLive(elm.id, { rotation: Number(e.target.value) })}
          onMouseDown={beginChange}
          onMouseUp={persist}
          className="w-full accent-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Width</label>
          <input
            type="number"
            min={10}
            value={Math.round(elm.width)}
            onChange={(e) => updateElement(elm.id, { width: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Height</label>
          <input
            type="number"
            min={10}
            value={Math.round(elm.height)}
            onChange={(e) => updateElement(elm.id, { height: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
      <p className="text-xs text-muted -mt-2">
        Tip: drag the image on the canvas to reposition, or drag its corner handles to crop-resize.
      </p>
    </div>
  );
}
