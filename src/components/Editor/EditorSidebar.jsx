import { LayoutTemplate, Type, Image as ImageIcon, Shapes, Palette } from 'lucide-react';
import TemplateSwitchPanel from './TemplateSwitchPanel';
import TextAddPanel from './TextAddPanel';
import ImageAddPanel from './ImageAddPanel';
import ElementsPanel from './ElementsPanel';
import BackgroundPanel from './BackgroundPanel';

export const TABS = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate, Panel: TemplateSwitchPanel },
  { id: 'text', label: 'Text', icon: Type, Panel: TextAddPanel },
  { id: 'images', label: 'Images', icon: ImageIcon, Panel: ImageAddPanel },
  { id: 'elements', label: 'Elements', icon: Shapes, Panel: ElementsPanel },
  { id: 'background', label: 'Background', icon: Palette, Panel: BackgroundPanel },
];

export default function EditorSidebar({ activeTab, setActiveTab }) {
  const active = TABS.find((t) => t.id === activeTab) || TABS[0];
  const ActivePanel = active.Panel;

  return (
    <div className="h-full flex">
      <div className="w-[76px] shrink-0 bg-paleblue border-r border-line flex flex-col items-center py-4 gap-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={`w-16 flex flex-col items-center gap-1 py-2.5 rounded-xl text-[11px] font-medium transition-colors ${
                isActive ? 'bg-primary text-white shadow-sm' : 'text-ink/60 hover:bg-white hover:text-primary'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-5 min-w-[240px]">
        <h2 className="text-sm font-semibold text-ink mb-4">{active.label}</h2>
        <ActivePanel />
      </div>
    </div>
  );
}
