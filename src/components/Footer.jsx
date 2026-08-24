import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </span>
          <span className="font-semibold text-ink">InviteCraft</span>
        </div>
        <p className="text-sm text-muted">© {new Date().getFullYear()} InviteCraft. All rights reserved.</p>
      </div>
    </footer>
  );
}
