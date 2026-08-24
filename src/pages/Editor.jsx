import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Sliders } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { useEditorHistory } from '../hooks/useEditorHistory';
import { getTemplateById } from '../data/templates';
import CanvasEditor from '../components/Editor/CanvasEditor';
import EditorToolbar from '../components/Editor/EditorToolbar';
import EditorSidebar, { TABS } from '../components/Editor/EditorSidebar';
import PropertiesPanel from '../components/Editor/PropertiesPanel';

export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const loadInvitation = useEditorStore((s) => s.loadInvitation);
  const selectedId = useEditorStore((s) => s.selectedId);

  const stageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('templates');
  const [mobileDrawer, setMobileDrawer] = useState(null); // 'tools' | 'properties' | null

  const { undo, redo, canUndo, canRedo } = useEditorHistory();

  useEffect(() => {
    if (!getTemplateById(templateId)) {
      navigate('/templates', { replace: true });
      return;
    }
    loadInvitation(templateId);
  }, [templateId, loadInvitation, navigate]);

  useEffect(() => {
    if (selectedId) setMobileDrawer('properties');
  }, [selectedId]);

  const template = getTemplateById(templateId);
  if (!template) return null;

  return (
    <div className="h-[100dvh] flex flex-col bg-paleblue overflow-hidden">
      <EditorToolbar stageRef={stageRef} canUndo={canUndo} canRedo={canRedo} undo={undo} redo={redo} />

      {/* Desktop / tablet layout */}
      <div className="flex-1 hidden md:flex overflow-hidden">
        <aside className="w-[300px] shrink-0 border-r border-line bg-white overflow-hidden">
          <EditorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>
        <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,#E2E8F0_1px,transparent_0)] [background-size:20px_20px]">
          <CanvasEditor stageRef={stageRef} />
        </main>
        <aside className="w-[300px] shrink-0 border-l border-line bg-white overflow-hidden">
          <PropertiesPanel />
        </aside>
      </div>

      {/* Mobile layout */}
      <div className="flex-1 md:hidden flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,#E2E8F0_1px,transparent_0)] [background-size:20px_20px]">
          <CanvasEditor stageRef={stageRef} />
        </main>

        <nav className="shrink-0 border-t border-line bg-white flex items-stretch">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileDrawer('tools'); }}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium text-ink/70 hover:text-primary"
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
          <button
            onClick={() => setMobileDrawer('properties')}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium text-ink/70 hover:text-primary"
          >
            <Sliders size={18} />
            Style
          </button>
        </nav>

        {mobileDrawer && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end">
            <div className="flex-1" onClick={() => setMobileDrawer(null)} />
            <div className="bg-white rounded-t-2xl border-t border-line shadow-2xl max-h-[70vh] flex flex-col animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
                <span className="text-sm font-semibold text-ink">
                  {mobileDrawer === 'properties' ? 'Properties' : TABS.find((t) => t.id === activeTab)?.label}
                </span>
                <button onClick={() => setMobileDrawer(null)} aria-label="Close panel" className="p-1.5 rounded-lg hover:bg-paleblue">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto p-5">
                {mobileDrawer === 'properties' ? (
                  <PropertiesPanel />
                ) : (
                  (() => {
                    const ActivePanel = TABS.find((t) => t.id === activeTab)?.Panel;
                    return ActivePanel ? <ActivePanel /> : null;
                  })()
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
