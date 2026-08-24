import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutTemplate } from 'lucide-react';
import TemplatePreview from './TemplatePreview';
import { TEMPLATES } from '../data/templates';

export default function Hero() {
  const navigate = useNavigate();
  const featured = TEMPLATES[0];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lightblue via-paleblue to-white" />
      <div className="absolute -top-24 -right-24 -z-10 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute top-40 -left-32 -z-10 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-3.5 py-1.5 text-xs font-medium text-primary shadow-sm mb-6">
            <LayoutTemplate size={14} /> 5+ designer-made templates
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-ink leading-[1.08] tracking-tight mb-6">
            Create Beautiful Invitations in Minutes
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
            Choose a design, customize every detail, and download your perfect invitation instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/templates')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Create Invitation <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/templates')}
              className="inline-flex items-center gap-2 bg-white text-ink font-semibold px-6 py-3.5 rounded-xl border border-line hover:border-primary/40 hover:bg-lightblue transition-all"
            >
              Browse Templates
            </button>
          </div>
          <div className="flex items-center gap-6 mt-10 text-sm text-muted">
            <div><span className="font-bold text-ink text-lg">10k+</span> invitations made</div>
            <div className="w-px h-8 bg-line" />
            <div><span className="font-bold text-ink text-lg">4.9/5</span> average rating</div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-indigo-300/20 rounded-[2rem] blur-2xl -z-10" />
            <div className="rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-black/5 rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
              <TemplatePreview template={featured} />
            </div>
            <div className="absolute -bottom-6 -left-10 w-40 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 -rotate-6 hidden sm:block bg-white">
              <TemplatePreview template={TEMPLATES[1]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
