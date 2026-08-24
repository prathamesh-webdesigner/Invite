import { forwardRef } from 'react';
import { Rect, Ellipse, Star, Path, Text, Image as KonvaImage, Group } from 'react-konva';
import { useImage } from '../../hooks/useImage';

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

function commonProps(elm, extra = {}) {
  return {
    id: elm.id,
    x: elm.x,
    y: elm.y,
    rotation: elm.rotation || 0,
    opacity: elm.opacity ?? 1,
    ...extra,
  };
}

export const ShapeElement = forwardRef(function ShapeElement({ elm, ...events }, ref) {
  const strokeProps = elm.strokeWidth ? { stroke: elm.stroke, strokeWidth: elm.strokeWidth } : {};

  if (elm.shapeType === 'circle') {
    return (
      <Ellipse
        ref={ref}
        {...commonProps(elm, {
          x: elm.x + elm.width / 2,
          y: elm.y + elm.height / 2,
          radiusX: elm.width / 2,
          radiusY: elm.height / 2,
        })}
        fill={elm.fill}
        {...strokeProps}
        {...events}
      />
    );
  }
  if (elm.shapeType === 'star') {
    return (
      <Star
        ref={ref}
        {...commonProps(elm, {
          x: elm.x + elm.width / 2,
          y: elm.y + elm.height / 2,
          numPoints: 5,
          innerRadius: elm.width * 0.2,
          outerRadius: elm.width / 2,
        })}
        fill={elm.fill}
        {...strokeProps}
        {...events}
      />
    );
  }
  if (elm.shapeType === 'heart') {
    return (
      <Path
        ref={ref}
        {...commonProps(elm, { scaleX: elm.width / 24, scaleY: elm.height / 24 })}
        data={HEART_PATH}
        fill={elm.fill}
        {...strokeProps}
        {...events}
      />
    );
  }
  if (elm.shapeType === 'line') {
    return (
      <Rect
        ref={ref}
        {...commonProps(elm, { width: elm.width, height: Math.max(elm.height, 2) })}
        fill={elm.fill}
        {...events}
      />
    );
  }
  // rect
  return (
    <Rect
      ref={ref}
      {...commonProps(elm, { width: elm.width, height: elm.height, cornerRadius: elm.cornerRadius || 0 })}
      fill={elm.fill}
      {...strokeProps}
      {...events}
    />
  );
});

export const TextElement = forwardRef(function TextElement({ elm, ...events }, ref) {
  return (
    <Text
      ref={ref}
      {...commonProps(elm, { width: elm.width, height: elm.height })}
      text={elm.text}
      fontFamily={elm.fontFamily}
      fontSize={elm.fontSize}
      fontStyle={Number(elm.fontWeight) >= 600 ? 'bold' : 'normal'}
      fill={elm.color}
      align={elm.align}
      letterSpacing={elm.letterSpacing || 0}
      lineHeight={elm.lineHeight || 1.2}
      wrap="word"
      {...events}
    />
  );
});

export const ImageElement = forwardRef(function ImageElement({ elm, ...events }, ref) {
  const img = useImage(elm.src);
  const isCircle = elm.borderRadius >= 999;

  return (
    <Group
      ref={ref}
      {...commonProps(elm, { width: elm.width, height: elm.height })}
      clipFunc={(ctx) => {
        const w = elm.width;
        const h = elm.height;
        const r = isCircle ? Math.min(w, h) / 2 : Math.min(elm.borderRadius || 0, w / 2, h / 2);
        ctx.beginPath();
        if (isCircle) {
          ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        } else {
          ctx.moveTo(r, 0);
          ctx.arcTo(w, 0, w, h, r);
          ctx.arcTo(w, h, 0, h, r);
          ctx.arcTo(0, h, 0, 0, r);
          ctx.arcTo(0, 0, w, 0, r);
        }
        ctx.closePath();
      }}
      {...events}
    >
      {img ? (
        (() => {
          const scale = Math.max(elm.width / img.width, elm.height / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          return (
            <KonvaImage
              image={img}
              x={(elm.width - dw) / 2}
              y={(elm.height - dh) / 2}
              width={dw}
              height={dh}
              listening={false}
            />
          );
        })()
      ) : (
        <Rect width={elm.width} height={elm.height} fill="#E2E8F0" listening={false} />
      )}
    </Group>
  );
});
