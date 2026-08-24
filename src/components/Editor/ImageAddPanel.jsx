import { useRef } from 'react';
import { Upload, ImagePlus } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { CANVAS_WIDTH } from '../../data/templates';
import { useToastStore } from '../../store/toastStore';

export default function ImageAddPanel() {
  const fileRef = useRef(null);
  const addElement = useEditorStore((s) => s.addElement);
  const showToast = useToastStore((s) => s.showToast);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addElement({ type: 'image', src: reader.result, x: CANVAS_WIDTH / 2 - 90, y: 260, width: 180, height: 180, borderRadius: 12 });
      showToast('Image added to canvas.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="flex flex-col gap-3">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex flex-col items-center justify-center gap-2 text-center border-2 border-dashed border-line rounded-xl py-8 px-4 hover:border-primary/50 hover:bg-lightblue transition-colors"
      >
        <Upload size={22} className="text-primary" />
        <span className="text-sm font-semibold text-ink">Upload Image</span>
        <span className="text-xs text-muted">PNG, JPG up to 10MB</span>
      </button>

      <button
        onClick={() =>
          addElement({
            type: 'image',
            src: '',
            x: CANVAS_WIDTH / 2 - 90,
            y: 260,
            width: 180,
            height: 180,
            borderRadius: 12,
          })
        }
        className="flex items-center gap-3 w-full text-left text-sm font-medium text-ink bg-white border border-line rounded-xl px-4 py-3 hover:border-primary/50 hover:bg-lightblue transition-colors"
      >
        <span className="w-9 h-9 rounded-lg bg-lightblue flex items-center justify-center text-primary shrink-0">
          <ImagePlus size={17} />
        </span>
        Add Image Placeholder
      </button>
    </div>
  );
}
