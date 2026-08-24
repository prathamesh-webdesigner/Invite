import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/templates';

// Lightweight CSS-based renderer used for thumbnails/previews (no canvas lib needed).
function shapeStyle(elm) {
  const common = {
    position: 'absolute',
    left: `${(elm.x / CANVAS_WIDTH) * 100}%`,
    top: `${(elm.y / CANVAS_HEIGHT) * 100}%`,
    width: `${(elm.width / CANVAS_WIDTH) * 100}%`,
    height: `${(elm.height / CANVAS_HEIGHT) * 100}%`,
    transform: `rotate(${elm.rotation || 0}deg)`,
    opacity: elm.opacity ?? 1,
  };
  if (elm.shapeType === 'circle') {
    return { ...common, borderRadius: '999px', background: elm.fill || 'transparent', border: elm.strokeWidth ? `${elm.strokeWidth}px solid ${elm.stroke}` : 'none' };
  }
  if (elm.shapeType === 'line') {
    return { ...common, background: elm.fill };
  }
  if (elm.shapeType === 'star' || elm.shapeType === 'heart') {
    return { ...common, background: elm.fill, clipPath: elm.shapeType === 'star'
      ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
      : 'path("M12 21s-8-4.6-8-11.2C4 5.8 7 4 9.5 4S14 5.7 12 8c2-2.3 4.5-4 6.5-4S20 5.8 20 9.8C20 16.4 12 21 12 21z")' };
  }
  return { ...common, background: elm.fill, borderRadius: '4px', border: elm.strokeWidth ? `${elm.strokeWidth}px solid ${elm.stroke}` : 'none' };
}

export default function TemplatePreview({ template, className = '' }) {
  const bg = template.background;
  const bgStyle =
    bg.type === 'gradient'
      ? { background: `linear-gradient(135deg, ${bg.gradient[0]}, ${bg.gradient[1]})` }
      : bg.type === 'image'
      ? { backgroundImage: `url(${bg.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { background: bg.color };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ ...bgStyle, aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`, containerType: 'inline-size' }}
    >
      {template.elements.map((elm) => {
        if (elm.type === 'text') {
          return (
            <div
              key={elm.id}
              style={{
                position: 'absolute',
                left: `${(elm.x / CANVAS_WIDTH) * 100}%`,
                top: `${(elm.y / CANVAS_HEIGHT) * 100}%`,
                width: `${(elm.width / CANVAS_WIDTH) * 100}%`,
                fontFamily: elm.fontFamily,
                fontSize: `${(elm.fontSize / CANVAS_WIDTH) * 100}cqw`,
                fontWeight: elm.fontWeight,
                color: elm.color,
                textAlign: elm.align,
                letterSpacing: elm.letterSpacing ? `${elm.letterSpacing * 0.4}px` : 0,
                lineHeight: elm.lineHeight || 1.2,
                transform: `rotate(${elm.rotation || 0}deg)`,
                opacity: elm.opacity ?? 1,
                whiteSpace: 'pre-wrap',
                pointerEvents: 'none',
              }}
              className="template-preview-text"
            >
              {elm.text}
            </div>
          );
        }
        if (elm.type === 'image') {
          return (
            <div
              key={elm.id}
              style={{
                position: 'absolute',
                left: `${(elm.x / CANVAS_WIDTH) * 100}%`,
                top: `${(elm.y / CANVAS_HEIGHT) * 100}%`,
                width: `${(elm.width / CANVAS_WIDTH) * 100}%`,
                height: `${(elm.height / CANVAS_HEIGHT) * 100}%`,
                borderRadius: elm.borderRadius >= 999 ? '999px' : `${(elm.borderRadius / CANVAS_WIDTH) * 100}%`,
                overflow: 'hidden',
                transform: `rotate(${elm.rotation || 0}deg)`,
                opacity: elm.opacity ?? 1,
              }}
            >
              <img src={elm.src} alt="" className="w-full h-full object-cover" draggable={false} />
            </div>
          );
        }
        return <div key={elm.id} style={shapeStyle(elm)} />;
      })}
    </div>
  );
}
