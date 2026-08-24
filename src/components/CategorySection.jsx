import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import CategoryCard from './CategoryCard';

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">Find Invitations For Every Occasion</h2>
        <p className="text-muted">Browse templates by category and start designing right away.</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => navigate(`/templates?category=${encodeURIComponent(cat.name)}`)}
          />
        ))}
      </div>
    </section>
  );
}
