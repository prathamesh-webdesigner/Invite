import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Image as ImageIcon, FileText, ChevronDown, Loader2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { useToastStore } from '../store/toastStore';
import CanvasEditor from '../components/Editor/CanvasEditor';
import { exportStageAsImage, downloadDataUrl } from '../utils/exportImage';
import { exportStageAsPdf } from '../utils/exportPdf';

export default function Preview() {
  const navigate = useNavigate();
  const templateId = useEditorStore((s) => s.templateId);
  const name = useEditorStore((s) => s.name);
  const showToast = useToastStore((s) => s.showToast);
  const stageRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!templateId) navigate('/templates', { replace: true });
  }, [templateId, navigate]);

  if (!templateId) return null;

  async function handleDownload(format) {
    setMenuOpen(false);
    setExporting(true);
    try {
      const stage = stageRef.current;
      const safeName = (name || 'invitation').trim().replace(/[^a-z0-9-_ ]/gi, '').replace(/\s+/g, '-') || 'invitation';
      const noop = () => {};
      if (format === 'pdf') {
        await exportStageAsPdf(stage, { selectedId: null, selectElement: noop, filename: `${safeName}.pdf` });
      } else {
        const dataUrl = await exportStageAsImage(stage, { format, selectedId: null, selectElement: noop });
        downloadDataUrl(dataUrl, `${safeName}.${format}`);
      }
      showToast('Invitation downloaded successfully.');
    } catch {
      showToast('Something went wrong while exporting. Please try again.', 'error');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="h-[100dvh] flex flex-col bg-ink">
      <header className="h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 bg-ink/95 border-b border-white/10">
        <button
          onClick={() => navigate(`/editor/${templateId}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} /> Edit Invitation
        </button>
        <span className="text-sm font-medium text-white/60 hidden sm:block">{name}</span>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark bg-white hover:bg-lightblue rounded-lg px-4 py-2.5 shadow-sm transition-colors disabled:opacity-60"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            Download <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-line shadow-lg py-2 z-50 animate-fade-in">
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
      </header>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-auto">
        <div className="w-full h-full max-w-2xl">
          <CanvasEditor stageRef={stageRef} readOnly />
        </div>
      </div>
    </div>
  );
}
