import { Palette, MousePointerClick, ImageDown, Smile } from 'lucide-react';

const FEATURES = [
  { title: 'Beautiful Templates', desc: 'Designer-crafted invitations for weddings, birthdays, and every celebration.', icon: Palette },
  { title: 'Easy Customization', desc: 'Change text, fonts, colors and images with a few clicks — no learning curve.', icon: MousePointerClick },
  { title: 'High Resolution Downloads', desc: 'Export crisp, print-ready PNG, JPG and PDF files in seconds.', icon: ImageDown },
  { title: 'No Design Experience Needed', desc: 'Our intuitive editor makes anyone look like a professional designer.', icon: Smile },
];

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">Why Use InviteCraft?</h2>
        <p className="text-muted">Everything you need to design invitations that make an impression.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="text-center sm:text-left p-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 mx-auto sm:mx-0 shadow-sm">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-ink mb-1.5">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
