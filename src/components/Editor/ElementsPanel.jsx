import { Square, Circle, Minus, Heart, Star } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { CANVAS_WIDTH } from '../../data/templates';

const SHAPES = [
  { label: 'Rectangle', icon: Square, shapeType: 'rect', width: 140, height: 90, fill: '#2563EB' },
  { label: 'Circle', icon: Circle, shapeType: 'circle', width: 100, height: 100, fill: '#2563EB' },
  { label: 'Line', icon: Minus, shapeType: 'line', width: 160, height: 3, fill: '#2563EB' },
  { label: 'Heart', icon: Heart, shapeType: 'heart', width: 60, height: 60, fill: '#EF4444' },
  { label: 'Star', icon: Star, shapeType: 'star', width: 60, height: 60, fill: '#F59E0B' },
];

export default function ElementsPanel() {
  const addElement = useEditorStore((s) => s.addElement);

  function add(shape) {
    addElement({
      type: 'shape',
      shapeType: shape.shapeType,
      x: CANVAS_WIDTH / 2 - shape.width / 2,
      y: 300,
      width: shape.width,
      height: shape.height,
      fill: shape.fill,
      stroke: '#1D4ED8',
      strokeWidth: 0,
    });
  }

  return (
    <div>
      <p className="text-xs text-muted mb-3">Add decorative shapes to your invitation.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {SHAPES.map((shape) => {
          const Icon = shape.icon;
          return (
            <button
              key={shape.label}
              onClick={() => add(shape)}
              className="flex flex-col items-center gap-2 bg-white border border-line rounded-xl py-4 hover:border-primary/50 hover:bg-lightblue transition-colors"
            >
              <Icon size={22} className="text-primary" />
              <span className="text-xs font-medium text-ink">{shape.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
