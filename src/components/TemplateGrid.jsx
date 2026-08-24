import { FileSearch } from 'lucide-react';
import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates }) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="w-16 h-16 rounded-2xl bg-lightblue flex items-center justify-center mb-4">
          <FileSearch size={28} className="text-primary" />
        </div>
        <h3 className="font-semibold text-ink text-lg mb-1">No templates found</h3>
        <p className="text-muted text-sm max-w-sm">
          Try a different search term or category filter to find the perfect invitation.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
