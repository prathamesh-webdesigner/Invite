import { LayoutTemplate, Wand2, Download } from 'lucide-react';

const STEPS = [
  { num: '01', title: 'Choose a Template', desc: 'Pick from professionally designed invitations for every occasion.', icon: LayoutTemplate },
  { num: '02', title: 'Customize Your Invitation', desc: 'Edit text, fonts, colors, images and layout with our visual editor.', icon: Wand2 },
  { num: '03', title: 'Download & Share', desc: 'Export as PNG, JPG or PDF and share it with your guests instantly.', icon: Download },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paleblue border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">How It Works</h2>
          <p className="text-muted">From blank template to beautiful invitation in three simple steps.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative bg-white rounded-2xl border border-line p-7 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl font-extrabold text-lightblue absolute top-5 right-6 select-none">{step.num}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-semibold text-ink text-lg mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
