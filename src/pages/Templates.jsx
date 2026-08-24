import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import TemplateGrid from '../components/TemplateGrid';

const FILTERS = ['All', 'Birthday', 'Wedding', 'Engagement', 'Anniversary', 'Baby Shower', 'Graduation', 'Party'];

export default function Templates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    const c = searchParams.get('category');
    if (c) setCategory(c);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category;
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  function selectCategory(cat) {
    setCategory(cat);
    if (cat === 'All') setSearchParams({});
    else setSearchParams({ category: cat });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-3">Choose Your Invitation</h1>
        <p className="text-muted">Start with a professionally designed template and make it yours.</p>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        <div className="relative max-w-md mx-auto w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates by name..."
            aria-label="Search templates"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={category === f}
              onClick={() => selectCategory(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                category === f
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-ink/80 border-line hover:border-primary/40 hover:bg-lightblue'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <TemplateGrid templates={filtered} />
    </div>
  );
}
