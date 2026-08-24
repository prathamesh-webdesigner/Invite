import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import TemplatePreview from './TemplatePreview';

export default function TemplateCard({ template }) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <TemplatePreview template={template} />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-center justify-center">
          <button
            onClick={() => navigate(`/editor/${template.id}`)}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-primary font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md hover:bg-primary hover:text-white"
          >
            Customize
          </button>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setFav((f) => !f); }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={fav}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart size={16} className={fav ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{template.category}</p>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-ink text-[15px] leading-tight">{template.name}</h3>
          <button
            onClick={() => navigate(`/editor/${template.id}`)}
            className="shrink-0 text-xs font-semibold text-primary hover:text-primary-dark px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-lightblue transition-colors"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}
