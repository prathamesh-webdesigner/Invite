import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark px-6 sm:px-16 py-14 sm:py-16 text-center shadow-xl">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <h2 className="relative text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Your Event Deserves a Beautiful Invitation
        </h2>
        <p className="relative text-blue-100 mb-8 max-w-lg mx-auto">
          Start designing for free — no sign up required to try the editor.
        </p>
        <button
          onClick={() => navigate('/templates')}
          className="relative inline-flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Create Your Invitation <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
