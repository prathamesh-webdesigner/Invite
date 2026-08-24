import { useEditorStore } from '../../store/editorStore';

export default function ShapePropertiesPanel({ elm }) {
  const updateElement = useEditorStore((s) => s.updateElement);
  const updateElementLive = useEditorStore((s) => s.updateElementLive);
  const beginChange = useEditorStore((s) => s.beginChange);
  const persist = useEditorStore((s) => s.persist);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Background Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={elm.fill || '#2563EB'}
            onChange={(e) => updateElement(elm.id, { fill: e.target.value })}
            className="w-10 h-10 rounded-lg border border-line cursor-pointer p-0.5"
            aria-label="Shape fill color"
          />
          <input
            type="text"
            value={elm.fill || ''}
            onChange={(e) => updateElement(elm.id, { fill: e.target.value })}
            className="flex-1 text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {elm.shapeType !== 'line' && (
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Border Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={elm.stroke || '#1D4ED8'}
              onChange={(e) => updateElement(elm.id, { stroke: e.target.value })}
              className="w-10 h-10 rounded-lg border border-line cursor-pointer p-0.5"
              aria-label="Shape border color"
            />
            <input
              type="range"
              min={0}
              max={12}
              value={elm.strokeWidth || 0}
              onChange={(e) => updateElement(elm.id, { strokeWidth: Number(e.target.value) })}
              className="flex-1 accent-primary"
              aria-label="Border width"
            />
            <span className="text-xs text-muted w-8 text-right">{elm.strokeWidth || 0}px</span>
          </div>
        </div>
      )}

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
        <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Rotation ({Math.round(elm.rotation)}°)</label>
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
            min={4}
            value={Math.round(elm.width)}
            onChange={(e) => updateElement(elm.id, { width: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Height</label>
          <input
            type="number"
            min={2}
            value={Math.round(elm.height)}
            onChange={(e) => updateElement(elm.id, { height: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">X Position</label>
          <input
            type="number"
            value={Math.round(elm.x)}
            onChange={(e) => updateElement(elm.id, { x: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/70 mb-1.5 block">Y Position</label>
          <input
            type="number"
            value={Math.round(elm.y)}
            onChange={(e) => updateElement(elm.id, { y: Number(e.target.value) })}
            className="w-full text-sm rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
    </div>
  );
}
