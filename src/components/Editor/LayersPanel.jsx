import { ChevronsUp, ChevronUp, ChevronDown, ChevronsDown, Type, Image as ImageIcon, Shapes, Layers } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

function iconFor(elm) {
  if (elm.type === 'text') return Type;
  if (elm.type === 'image') return ImageIcon;
  return Shapes;
}

function labelFor(elm) {
  if (elm.type === 'text') return elm.text?.slice(0, 22) || 'Text';
  if (elm.type === 'image') return 'Image';
  return elm.shapeType ? elm.shapeType[0].toUpperCase() + elm.shapeType.slice(1) : 'Shape';
}

export default function LayersPanel() {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const reorderElement = useEditorStore((s) => s.reorderElement);

  const reversed = [...elements].reverse();

  return (
    <div>
      <h3 className="flex items-center gap-1.5 text-xs font-semibold text-ink/70 uppercase tracking-wide mb-3">
        <Layers size={13} /> Layers
      </h3>
      {elements.length === 0 ? (
        <p className="text-xs text-muted">No elements yet. Add text, images or shapes to get started.</p>
      ) : (
        <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
          {reversed.map((elm) => {
            const Icon = iconFor(elm);
            const active = selectedId === elm.id;
            return (
              <div
                key={elm.id}
                onClick={() => selectElement(elm.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
                  active ? 'bg-lightblue border-primary text-primary' : 'border-transparent hover:bg-paleblue text-ink/80'
                }`}
              >
                <Icon size={14} className="shrink-0" />
                <span className="flex-1 truncate">{labelFor(elm)}</span>
                {active && (
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button title="Send to back" aria-label="Send to back" onClick={(e) => { e.stopPropagation(); reorderElement(elm.id, 'back'); }} className="p-1 hover:bg-white rounded">
                      <ChevronsDown size={13} />
                    </button>
                    <button title="Send backward" aria-label="Send backward" onClick={(e) => { e.stopPropagation(); reorderElement(elm.id, 'backward'); }} className="p-1 hover:bg-white rounded">
                      <ChevronDown size={13} />
                    </button>
                    <button title="Bring forward" aria-label="Bring forward" onClick={(e) => { e.stopPropagation(); reorderElement(elm.id, 'forward'); }} className="p-1 hover:bg-white rounded">
                      <ChevronUp size={13} />
                    </button>
                    <button title="Bring to front" aria-label="Bring to front" onClick={(e) => { e.stopPropagation(); reorderElement(elm.id, 'front'); }} className="p-1 hover:bg-white rounded">
                      <ChevronsUp size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
