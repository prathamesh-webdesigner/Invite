import {
  Cake, Heart, Gem, CalendarHeart, Baby, Sparkles,
  GraduationCap, PartyPopper, Briefcase, CalendarDays,
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'birthday', name: 'Birthday', icon: Cake, color: 'from-blue-500 to-blue-600' },
  { id: 'wedding', name: 'Wedding', icon: Heart, color: 'from-rose-400 to-blue-500' },
  { id: 'engagement', name: 'Engagement', icon: Gem, color: 'from-indigo-500 to-blue-600' },
  { id: 'anniversary', name: 'Anniversary', icon: CalendarHeart, color: 'from-blue-400 to-indigo-500' },
  { id: 'baby-shower', name: 'Baby Shower', icon: Baby, color: 'from-sky-400 to-blue-400' },
  { id: 'bridal-shower', name: 'Bridal Shower', icon: Sparkles, color: 'from-blue-300 to-blue-500' },
  { id: 'graduation', name: 'Graduation', icon: GraduationCap, color: 'from-blue-600 to-indigo-700' },
  { id: 'party', name: 'Party', icon: PartyPopper, color: 'from-blue-500 to-purple-500' },
  { id: 'business', name: 'Business Event', icon: Briefcase, color: 'from-slate-700 to-blue-800' },
  { id: 'save-the-date', name: 'Save the Date', icon: CalendarDays, color: 'from-blue-400 to-slate-600' },
];
