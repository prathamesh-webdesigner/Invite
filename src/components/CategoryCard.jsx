export default function CategoryCard({ category, active, onClick }) {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
        active ? 'border-primary bg-lightblue shadow-sm' : 'border-line bg-white hover:border-primary/40'
      }`}
    >
      <span
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
      >
        <Icon size={22} className="text-white" />
      </span>
      <span className="text-sm font-medium text-ink text-center leading-tight">{category.name}</span>
    </button>
  );
}
