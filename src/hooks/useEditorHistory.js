import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';

// Wires up Ctrl/Cmd+Z (undo), Ctrl/Cmd+Shift+Z or Ctrl+Y (redo),
// Delete/Backspace (remove selected element) and Ctrl/Cmd+D (duplicate).
export function useEditorHistory({ enabled = true } = {}) {
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const deleteElement = useEditorStore((s) => s.deleteElement);
  const duplicateElement = useEditorStore((s) => s.duplicateElement);
  const canUndo = useEditorStore((s) => s.past.length > 0);
  const canRedo = useEditorStore((s) => s.future.length > 0);

  useEffect(() => {
    if (!enabled) return;

    function isEditableTarget(target) {
      const tag = target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
    }

    function onKeyDown(e) {
      const meta = e.ctrlKey || e.metaKey;
      if (meta && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if (meta && ((e.key.toLowerCase() === 'z' && e.shiftKey) || e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        redo();
        return;
      }
      if (isEditableTarget(e.target)) return;

      const { selectedId } = useEditorStore.getState();
      if (!selectedId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteElement(selectedId);
      } else if (meta && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateElement(selectedId);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, undo, redo, deleteElement, duplicateElement]);

  return { undo, redo, canUndo, canRedo };
}
