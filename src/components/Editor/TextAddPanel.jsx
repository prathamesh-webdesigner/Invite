import { Heading1, Heading2, Pilcrow } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { CANVAS_WIDTH } from '../../data/templates';

const PRESETS = [
  {
    label: 'Add Heading',
    icon: Heading1,
    build: () => ({ type: 'text', text: 'Add a heading', x: 60, y: 100, width: CANVAS_WIDTH - 120, height: 50, fontFamily: '"Playfair Display", serif', fontSize: 36, fontWeight: '700', color: '#0F172A', align: 'center', letterSpacing: 0, lineHeight: 1.15 }),
  },
  {
    label: 'Add Subheading',
    icon: Heading2,
    build: () => ({ type: 'text', text: 'Add a subheading', x: 60, y: 160, width: CANVAS_WIDTH - 120, height: 36, fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: '600', color: '#1E3A5F', align: 'center', letterSpacing: 1, lineHeight: 1.2 }),
  },
  {
    label: 'Add Body Text',
    icon: Pilcrow,
    build: () => ({ type: 'text', text: 'Add your body text here. Double-click to edit.', x: 60, y: 220, width: CANVAS_WIDTH - 120, height: 60, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: '400', color: '#334155', align: 'center', letterSpacing: 0, lineHeight: 1.4 }),
  },
];

export default function TextAddPanel() {
  const addElement = useEditorStore((s) => s.addElement);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs text-muted mb-1">Click to add a text element to your invitation.</p>
      {PRESETS.map(({ label, icon: Icon, build }) => (
        <button
          key={label}
          onClick={() => addElement(build())}
          className="flex items-center gap-3 w-full text-left text-sm font-medium text-ink bg-white border border-line rounded-xl px-4 py-3 hover:border-primary/50 hover:bg-lightblue transition-colors"
        >
          <span className="w-9 h-9 rounded-lg bg-lightblue flex items-center justify-center text-primary shrink-0">
            <Icon size={17} />
          </span>
          {label}
        </button>
      ))}
    </div>
  );
}
