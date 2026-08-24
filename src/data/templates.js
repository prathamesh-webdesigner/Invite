// Canvas is a fixed 500 x 700 (5:7 portrait) design surface.
// All element coordinates/sizes are in this design-space, in pixels.

export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 700;

// Self-contained SVG placeholder "photos" (no network dependency, CORS-safe for canvas export).
const CAMERA_ICON =
  'M9 3l1.5 2h3L15 3h3a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h3z M12 17a4 4 0 100-8 4 4 0 000 8z';

function placeholderPhoto(from, to, label = 'Photo') {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${from}'/>
        <stop offset='1' stop-color='${to}'/>
      </linearGradient>
    </defs>
    <rect width='600' height='600' fill='url(#g)'/>
    <g transform='translate(255,240) scale(3.5)' fill='none' stroke='rgba(255,255,255,0.85)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'>
      <path d='${CAMERA_ICON}'/>
    </g>
    <text x='300' y='420' font-family='Poppins, sans-serif' font-size='26' font-weight='600' fill='rgba(255,255,255,0.85)' text-anchor='middle'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const img = {
  wedding: placeholderPhoto('#9DB8E8', '#5C7FB8', 'Couple Photo'),
  birthday: placeholderPhoto('#FDBA74', '#F472B6', 'Birthday Photo'),
  engagement: placeholderPhoto('#3B5580', '#1A2A45', 'Couple Photo'),
  baby: placeholderPhoto('#93C5FD', '#60A5FA', 'Baby Photo'),
  speaker1: placeholderPhoto('#334155', '#1E293B', 'Speaker'),
  speaker2: placeholderPhoto('#1E3A5F', '#0F1E3D', 'Speaker'),
};

function el(base) {
  return {
    rotation: 0,
    opacity: 1,
    ...base,
  };
}

export const TEMPLATES = [
  {
    id: 'elegant-wedding',
    name: 'Elegant Wedding',
    category: 'Wedding',
    aspectRatio: '5:7',
    thumbnailBg: '#F8F5EF',
    background: { type: 'solid', color: '#F8F5EF' },
    elements: [
      el({ id: 'w-line-top', type: 'shape', shapeType: 'line', x: 150, y: 50, width: 200, height: 2, fill: '#94A9C9', stroke: '#94A9C9', strokeWidth: 1 }),
      el({ id: 'w-photo', type: 'image', src: img.wedding, x: 175, y: 75, width: 150, height: 150, borderRadius: 999 }),
      el({ id: 'w-photo-ring', type: 'shape', shapeType: 'circle', x: 170, y: 70, width: 160, height: 160, fill: 'transparent', stroke: '#2563EB', strokeWidth: 2 }),
      el({ id: 'w-kicker', type: 'text', text: 'TOGETHER WITH THEIR FAMILIES', x: 40, y: 250, width: 420, height: 24, fontFamily: '"Playfair Display", serif', fontSize: 13, fontWeight: '500', color: '#64748B', align: 'center', letterSpacing: 3, lineHeight: 1.2 }),
      el({ id: 'w-names', type: 'text', text: 'Alex & Sophia', x: 30, y: 285, width: 440, height: 70, fontFamily: '"Great Vibes", cursive', fontSize: 64, fontWeight: '400', color: '#1E3A5F', align: 'center', letterSpacing: 0, lineHeight: 1.1 }),
      el({ id: 'w-invite', type: 'text', text: 'Invite you to celebrate their wedding', x: 60, y: 365, width: 380, height: 30, fontFamily: '"Playfair Display", serif', fontSize: 15, fontWeight: '400', color: '#334155', align: 'center', letterSpacing: 0.5, lineHeight: 1.3 }),
      el({ id: 'w-div', type: 'shape', shapeType: 'line', x: 200, y: 420, width: 100, height: 2, fill: '#2563EB', stroke: '#2563EB', strokeWidth: 1 }),
      el({ id: 'w-heart', type: 'shape', shapeType: 'heart', x: 235, y: 435, width: 30, height: 30, fill: '#2563EB', stroke: '', strokeWidth: 0 }),
      el({ id: 'w-date', type: 'text', text: 'Saturday, 14 November 2026', x: 40, y: 500, width: 420, height: 32, fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: '600', color: '#1E3A5F', align: 'center', letterSpacing: 0.5, lineHeight: 1.2 }),
      el({ id: 'w-venue', type: 'text', text: 'Royal Garden, Mumbai', x: 40, y: 538, width: 420, height: 26, fontFamily: '"Lora", serif', fontSize: 15, fontWeight: '400', color: '#64748B', align: 'center', letterSpacing: 1, lineHeight: 1.2 }),
      el({ id: 'w-line-bottom', type: 'shape', shapeType: 'line', x: 150, y: 630, width: 200, height: 2, fill: '#94A9C9', stroke: '#94A9C9', strokeWidth: 1 }),
    ],
  },
  {
    id: 'birthday-celebration',
    name: 'Birthday Celebration',
    category: 'Birthday',
    aspectRatio: '5:7',
    thumbnailBg: '#3B5BFF',
    background: { type: 'gradient', gradient: ['#3B5BFF', '#8B5CF6'] },
    elements: [
      el({ id: 'b-confetti-1', type: 'shape', shapeType: 'circle', x: 40, y: 40, width: 14, height: 14, fill: '#FDE68A', stroke: '', strokeWidth: 0 }),
      el({ id: 'b-confetti-2', type: 'shape', shapeType: 'star', x: 420, y: 60, width: 22, height: 22, fill: '#FCA5A5', stroke: '', strokeWidth: 0 }),
      el({ id: 'b-confetti-3', type: 'shape', shapeType: 'circle', x: 400, y: 150, width: 10, height: 10, fill: '#FFFFFF', stroke: '', strokeWidth: 0, opacity: 0.8 }),
      el({ id: 'b-confetti-4', type: 'shape', shapeType: 'star', x: 55, y: 180, width: 16, height: 16, fill: '#FDE68A', stroke: '', strokeWidth: 0 }),
      el({ id: 'b-balloon-1', type: 'shape', shapeType: 'circle', x: 30, y: 480, width: 60, height: 70, fill: '#FCA5A5', stroke: '', strokeWidth: 0, rotation: -8 }),
      el({ id: 'b-balloon-2', type: 'shape', shapeType: 'circle', x: 400, y: 500, width: 60, height: 70, fill: '#FDE68A', stroke: '', strokeWidth: 0, rotation: 8 }),
      el({ id: 'b-kicker', type: 'text', text: "IT'S MY", x: 40, y: 70, width: 420, height: 34, fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: '600', color: '#FFFFFF', align: 'center', letterSpacing: 4, lineHeight: 1.2 }),
      el({ id: 'b-number', type: 'text', text: '25th', x: 20, y: 105, width: 460, height: 160, fontFamily: 'Poppins, sans-serif', fontSize: 130, fontWeight: '700', color: '#FFFFFF', align: 'center', letterSpacing: 0, lineHeight: 1 }),
      el({ id: 'b-title', type: 'text', text: 'BIRTHDAY', x: 40, y: 265, width: 420, height: 46, fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: '700', color: '#FFFFFF', align: 'center', letterSpacing: 6, lineHeight: 1.2 }),
      el({ id: 'b-photo', type: 'image', src: img.birthday, x: 150, y: 335, width: 200, height: 150, borderRadius: 20 }),
      el({ id: 'b-sub', type: 'text', text: 'Join me for an unforgettable celebration', x: 50, y: 555, width: 400, height: 30, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: '500', color: '#EFF6FF', align: 'center', letterSpacing: 0.3, lineHeight: 1.3 }),
      el({ id: 'b-time', type: 'text', text: 'Saturday • 7:00 PM', x: 50, y: 600, width: 400, height: 28, fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: '600', color: '#FDE68A', align: 'center', letterSpacing: 1, lineHeight: 1.2 }),
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement Night',
    category: 'Engagement',
    aspectRatio: '5:7',
    thumbnailBg: '#0F1E3D',
    background: { type: 'solid', color: '#0F1E3D' },
    elements: [
      el({ id: 'e-ring-1', type: 'shape', shapeType: 'circle', x: 60, y: 50, width: 26, height: 26, fill: 'transparent', stroke: '#D4AF8C', strokeWidth: 2, opacity: 0.7 }),
      el({ id: 'e-ring-2', type: 'shape', shapeType: 'circle', x: 400, y: 610, width: 34, height: 34, fill: 'transparent', stroke: '#D4AF8C', strokeWidth: 2, opacity: 0.6 }),
      el({ id: 'e-kicker', type: 'text', text: "WE'RE ENGAGED", x: 40, y: 90, width: 420, height: 30, fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: '600', color: '#D4AF8C', align: 'center', letterSpacing: 6, lineHeight: 1.2 }),
      el({ id: 'e-photo-ring', type: 'shape', shapeType: 'circle', x: 145, y: 150, width: 210, height: 210, fill: 'transparent', stroke: '#D4AF8C', strokeWidth: 3 }),
      el({ id: 'e-photo', type: 'image', src: img.engagement, x: 160, y: 165, width: 180, height: 180, borderRadius: 999 }),
      el({ id: 'e-names', type: 'text', text: 'Arjun & Meera', x: 20, y: 400, width: 460, height: 60, fontFamily: '"Playfair Display", serif', fontSize: 46, fontWeight: '700', color: '#FFFFFF', align: 'center', letterSpacing: 0.5, lineHeight: 1.1 }),
      el({ id: 'e-heart', type: 'shape', shapeType: 'heart', x: 235, y: 470, width: 28, height: 28, fill: '#D4AF8C', stroke: '', strokeWidth: 0 }),
      el({ id: 'e-sub', type: 'text', text: 'Join us as we celebrate the beginning of forever.', x: 60, y: 525, width: 380, height: 50, fontFamily: 'Lora, serif', fontSize: 15, fontWeight: '400', color: '#CBD5E1', align: 'center', letterSpacing: 0.3, lineHeight: 1.5 }),
      el({ id: 'e-line', type: 'shape', shapeType: 'line', x: 210, y: 610, width: 80, height: 1.5, fill: '#D4AF8C', stroke: '#D4AF8C', strokeWidth: 1 }),
    ],
  },
  {
    id: 'baby-shower',
    name: 'Sweet Baby Shower',
    category: 'Baby Shower',
    aspectRatio: '5:7',
    thumbnailBg: '#EAF4FF',
    background: { type: 'solid', color: '#EAF4FF' },
    elements: [
      el({ id: 'bs-cloud-1', type: 'shape', shapeType: 'circle', x: 30, y: 45, width: 70, height: 44, fill: '#FFFFFF', stroke: '', strokeWidth: 0 }),
      el({ id: 'bs-cloud-2', type: 'shape', shapeType: 'circle', x: 370, y: 90, width: 90, height: 54, fill: '#FFFFFF', stroke: '', strokeWidth: 0 }),
      el({ id: 'bs-star-1', type: 'shape', shapeType: 'star', x: 60, y: 130, width: 18, height: 18, fill: '#BFDBFE', stroke: '', strokeWidth: 0 }),
      el({ id: 'bs-star-2', type: 'shape', shapeType: 'star', x: 420, y: 160, width: 14, height: 14, fill: '#93C5FD', stroke: '', strokeWidth: 0 }),
      el({ id: 'bs-kicker', type: 'text', text: 'A Little One Is On The Way', x: 30, y: 190, width: 440, height: 60, fontFamily: 'Montserrat, sans-serif', fontSize: 27, fontWeight: '700', color: '#1E3A5F', align: 'center', letterSpacing: 0, lineHeight: 1.25 }),
      el({ id: 'bs-photo-ring', type: 'shape', shapeType: 'circle', x: 148, y: 275, width: 204, height: 204, fill: '#FFFFFF', stroke: '#BFDBFE', strokeWidth: 4 }),
      el({ id: 'bs-photo', type: 'image', src: img.baby, x: 163, y: 290, width: 174, height: 174, borderRadius: 999 }),
      el({ id: 'bs-sub', type: 'text', text: 'Join us for a Baby Shower', x: 50, y: 505, width: 400, height: 32, fontFamily: 'Poppins, sans-serif', fontSize: 19, fontWeight: '600', color: '#2563EB', align: 'center', letterSpacing: 0.3, lineHeight: 1.2 }),
      el({ id: 'bs-date', type: 'text', text: 'Sunday, 18 October', x: 50, y: 545, width: 400, height: 28, fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: '500', color: '#64748B', align: 'center', letterSpacing: 0.5, lineHeight: 1.2 }),
      el({ id: 'bs-star-3', type: 'shape', shapeType: 'star', x: 240, y: 610, width: 16, height: 16, fill: '#93C5FD', stroke: '', strokeWidth: 0 }),
    ],
  },
  {
    id: 'business-summit',
    name: 'Leadership Summit',
    category: 'Business Event',
    aspectRatio: '5:7',
    thumbnailBg: '#0B1B33',
    background: { type: 'gradient', gradient: ['#0B1B33', '#122B52'] },
    elements: [
      el({ id: 'bz-shape-1', type: 'shape', shapeType: 'rect', x: -40, y: -40, width: 180, height: 180, fill: '#1E3A5F', stroke: '', strokeWidth: 0, opacity: 0.5, rotation: 20 }),
      el({ id: 'bz-shape-2', type: 'shape', shapeType: 'circle', x: 380, y: 550, width: 160, height: 160, fill: '#2563EB', stroke: '', strokeWidth: 0, opacity: 0.25 }),
      el({ id: 'bz-line', type: 'shape', shapeType: 'line', x: 200, y: 90, width: 100, height: 2, fill: '#60A5FA', stroke: '#60A5FA', strokeWidth: 1 }),
      el({ id: 'bz-kicker', type: 'text', text: 'ANNUAL LEADERSHIP SUMMIT', x: 30, y: 110, width: 440, height: 26, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: '600', color: '#93C5FD', align: 'center', letterSpacing: 3, lineHeight: 1.2 }),
      el({ id: 'bz-title', type: 'text', text: 'Future of Business 2026', x: 30, y: 150, width: 440, height: 90, fontFamily: 'Montserrat, sans-serif', fontSize: 36, fontWeight: '700', color: '#FFFFFF', align: 'center', letterSpacing: 0, lineHeight: 1.15 }),
      el({ id: 'bz-sub', type: 'text', text: 'Connect • Learn • Grow', x: 30, y: 245, width: 440, height: 26, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: '500', color: '#CBD5E1', align: 'center', letterSpacing: 2, lineHeight: 1.2 }),
      el({ id: 'bz-photo-1', type: 'image', src: img.speaker1, x: 60, y: 320, width: 175, height: 220, borderRadius: 12 }),
      el({ id: 'bz-photo-2', type: 'image', src: img.speaker2, x: 265, y: 320, width: 175, height: 220, borderRadius: 12 }),
      el({ id: 'bz-date', type: 'text', text: '25 November 2026', x: 30, y: 575, width: 440, height: 30, fontFamily: 'Montserrat, sans-serif', fontSize: 19, fontWeight: '600', color: '#FFFFFF', align: 'center', letterSpacing: 0.5, lineHeight: 1.2 }),
      el({ id: 'bz-venue', type: 'text', text: 'Grand Hyatt Mumbai', x: 30, y: 610, width: 440, height: 26, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: '400', color: '#93C5FD', align: 'center', letterSpacing: 1, lineHeight: 1.2 }),
    ],
  },
  {
  id: 'woodland-birthday',
  name: 'Woodland Animals Birthday',
  category: 'Birthday',
  aspectRatio: '5:7',
  thumbnailBg: '#F7F1E8',
  background: { type: 'solid', color: '#F7F1E8' },
  elements: [
    // top row
    el({ id: 'wa-bear',     type: 'image', src: 'https://static.vecteezy.com/system/resources/thumbnails/053/857/306/small/baby-is-lying-on-a-blanket-with-a-white-headband-on-the-baby-is-smiling-and-looking-at-the-camera-the-scene-is-warm-and-inviting-with-the-baby-s-innocence-and-joy-shining-through-free-photo.jpg', x: 35,  y: 35,  width: 130, height: 130, borderRadius: 0 }),
    el({ id: 'wa-mouse1',   type: 'image', src: '', x: 195, y: 50,  width: 110, height: 110, borderRadius: 0 }),
    el({ id: 'wa-fox',      type: 'image', src: '', x: 335, y: 30,  width: 130, height: 130, borderRadius: 0 }),

    // upper-middle row
    el({ id: 'wa-squirrel1',type: 'image', src: '', x: 25,  y: 180, width: 115, height: 115, borderRadius: 0 }),
    el({ id: 'wa-skunk',    type: 'image', src: '', x: 360, y: 185, width: 110, height: 110, borderRadius: 0 }),

    // lower-middle row
    el({ id: 'wa-ant',      type: 'image', src: '', x: 35,  y: 345, width: 90,  height: 90,  borderRadius: 0 }),
    el({ id: 'wa-bird',     type: 'image', src: '', x: 375, y: 330, width: 90,  height: 90,  borderRadius: 0 }),

    // bottom row
    el({ id: 'wa-squirrel2',type: 'image', src: '', x: 35,  y: 480, width: 130, height: 130, borderRadius: 0 }),
    el({ id: 'wa-mouse2',   type: 'image', src: '', x: 205, y: 500, width: 110, height: 110, borderRadius: 0 }),
    el({ id: 'wa-hedgehog', type: 'image', src: '', x: 345, y: 470, width: 140, height: 140, borderRadius: 0 }),

    // center text
    el({ id: 'wa-name',    type: 'text', text: 'LEO IS', x: 130, y: 220, width: 240, height: 46, fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: '700', color: '#E1662F', align: 'center', letterSpacing: 1, lineHeight: 1.1 }),
    el({ id: 'wa-age',     type: 'text', text: 'TURNING 5', x: 130, y: 275, width: 240, height: 26, fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: '600', color: '#6B5B4E', align: 'center', letterSpacing: 3, lineHeight: 1.2 }),
    el({ id: 'wa-date',    type: 'text', text: 'OCTOBER 11', x: 130, y: 320, width: 240, height: 34, fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: '700', color: '#E1662F', align: 'center', letterSpacing: 0.5, lineHeight: 1.2 }),
    el({ id: 'wa-time',    type: 'text', text: '10:30 AM', x: 130, y: 356, width: 240, height: 34, fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: '700', color: '#E1662F', align: 'center', letterSpacing: 0.5, lineHeight: 1.2 }),
    el({ id: 'wa-addr1',   type: 'text', text: 'OUR HOME', x: 130, y: 410, width: 240, height: 20, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: '600', color: '#8A7A6B', align: 'center', letterSpacing: 1.5, lineHeight: 1.4 }),
    el({ id: 'wa-addr2',   type: 'text', text: '879 WEST MAIN STREET\nSILVERTON, OR 97381', x: 130, y: 430, width: 240, height: 40, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: '500', color: '#8A7A6B', align: 'center', letterSpacing: 1, lineHeight: 1.6 }),
  ],
},
];

export function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id);
}
