import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Undo2, Redo2, Eye, Download, Save, ChevronDown, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useToastStore } from '../../store/toastStore';
import { exportStageAsImage, downloadDataUrl } from '../../utils/exportImage';
import { exportStageAsPdf } from '../../utils/exportPdf';

export default function EditorToolbar({ stageRef, canUndo, canRedo, undo, redo }) {
  const navigate = useNavigate();
  const name = useEditorStore((s) => s.name);
  const setName = useEditorStore((s) => s.setName);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const persist = useEditorStore((s) => s.persist);
  const showToast = useToastStore((s) => s.showToast);

  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  async function handleDownload(format) {
    setMenuOpen(false);
    setExporting(true);
    try {
      const stage = stageRef.current;
      const safeName = (name || 'invitation').trim().replace(/[^a-z0-9-_ ]/gi, '').replace(/\s+/g, '-') || 'invitation';
      if (format === 'pdf') {
        await exportStageAsPdf(stage, { selectedId, selectElement, filename: `${safeName}.pdf` });
      } else {
        const dataUrl = await exportStageAsImage(stage, { format, selectedId, selectElement });
        downloadDataUrl(dataUrl, `${safeName}.${format}`);
      }
      showToast(`Invitation downloaded successfully.`);
    } catch (err) {
      showToast('Something went wrong while exporting. Please try again.', 'error');
    } finally {
      setExporting(false);
    }
  }

  function handleSave() {
    persist();
    showToast('Invitation saved.');
  }

  return (
    <header className="h-16 shrink-0 border-b border-line bg-white flex items-center justify-between px-3 sm:px-5 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => navigate('/templates')}
          aria-label="Back to templates"
          className="p-2 rounded-lg hover:bg-paleblue text-ink/70 shrink-0"
        >
          <ArrowLeft size={19} />
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Invitation name"
          className="font-semibold text-sm sm:text-base text-ink bg-transparent border-b border-transparent hover:border-line focus:border-primary focus:outline-none px-1 py-1 min-w-0 w-16 sm:w-56 truncate"
        />
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          aria-label="Undo"
          title="Undo (Ctrl+Z)"
          className="p-2 rounded-lg hover:bg-paleblue text-ink/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          aria-label="Redo"
          title="Redo (Ctrl+Shift+Z)"
          className="p-2 rounded-lg hover:bg-paleblue text-ink/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Redo2 size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate('/preview')}
          aria-label="Preview invitation"
          title="Preview"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 border border-line rounded-lg px-2.5 sm:px-3.5 py-2 hover:bg-paleblue transition-colors"
        >
          <Eye size={16} /> <span className="hidden sm:inline">Preview</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            disabled={exporting}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg px-3.5 py-2 shadow-sm transition-colors disabled:opacity-60"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            <span className="hidden sm:inline">Download</span>
            <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-line shadow-lg py-2 z-50 animate-fade-in">
              <p className="px-4 pb-1.5 text-xs font-semibold text-muted uppercase tracking-wide">Download Invitation</p>
              <button onClick={() => handleDownload('png')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-lightblue transition-colors">
                <ImageIcon size={16} className="text-primary" /> PNG Image
              </button>
              <button onClick={() => handleDownload('jpg')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-lightblue transition-colors">
                <ImageIcon size={16} className="text-primary" /> JPG Image
              </button>
              <button onClick={() => handleDownload('pdf')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-lightblue transition-colors">
                <FileText size={16} className="text-primary" /> PDF
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          aria-label="Save invitation"
          title="Save"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 border border-line rounded-lg px-2.5 sm:px-3.5 py-2 hover:bg-paleblue transition-colors"
        >
          <Save size={16} /> <span className="hidden sm:inline">Save</span>
        </button>
      </div>
    </header>
  );
}
