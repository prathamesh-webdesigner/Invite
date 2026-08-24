import { Trash2, Copy, MousePointer2 } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import ShapePropertiesPanel from './ShapePropertiesPanel';
import LayersPanel from './LayersPanel';
import { useToastStore } from '../../store/toastStore';

export default function PropertiesPanel() {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const deleteElement = useEditorStore((s) => s.deleteElement);
  const duplicateElement = useEditorStore((s) => s.duplicateElement);
  const showToast = useToastStore((s) => s.showToast);
  const elm = elements.find((e) => e.id === selectedId);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-sm font-semibold text-ink mb-4">Properties</h2>

        {!elm ? (
          <div className="flex flex-col items-center text-center py-10 px-2 mb-6 bg-paleblue rounded-xl border border-dashed border-line">
            <MousePointer2 size={22} className="text-muted mb-2" />
            <p className="text-sm text-muted">Select an element on the canvas to edit its properties.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-medium bg-lightblue text-primary px-2.5 py-1 rounded-full capitalize">
                {elm.type === 'shape' ? elm.shapeType : elm.type}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => duplicateElement(elm.id)}
                  aria-label="Duplicate element"
                  title="Duplicate"
                  className="p-2 rounded-lg border border-line hover:bg-lightblue hover:border-primary/40 transition-colors"
                >
                  <Copy size={15} className="text-ink/70" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this element?')) {
                      deleteElement(elm.id);
                      showToast('Element deleted.', 'info');
                    }
                  }}
                  aria-label="Delete element"
                  title="Delete"
                  className="p-2 rounded-lg border border-line hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  <Trash2 size={15} className="text-red-500" />
                </button>
              </div>
            </div>

            {elm.type === 'text' && <TextPanel elm={elm} />}
            {elm.type === 'image' && <ImagePanel elm={elm} />}
            {elm.type === 'shape' && <ShapePropertiesPanel elm={elm} />}
          </>
        )}

        <div className="mt-8 pt-6 border-t border-line">
          <LayersPanel />
        </div>
      </div>
    </div>
  );
}
