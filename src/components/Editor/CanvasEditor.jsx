import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Stage, Layer, Rect, Transformer, Image as KonvaBgImage } from 'react-konva';
import { useEditorStore } from '../../store/editorStore';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/templates';
import { ShapeElement, TextElement, ImageElement } from './ElementRenderer';

function isCenteredShape(elm) {
  return elm.type === 'shape' && (elm.shapeType === 'circle' || elm.shapeType === 'star');
}

function nodeToStoreXY(elm, node) {
  if (isCenteredShape(elm)) {
    return { x: node.x() - elm.width / 2, y: node.y() - elm.height / 2 };
  }
  return { x: node.x(), y: node.y() };
}

export default function CanvasEditor({ readOnly = false, stageRef: externalStageRef }) {
  const containerRef = useRef(null);
  const internalStageRef = useRef(null);
  const stageRef = externalStageRef || internalStageRef;
  const transformerRef = useRef(null);
  const nodeRefs = useRef(new Map());

  const elements = useEditorStore((s) => s.elements);
  const background = useEditorStore((s) => s.background);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const updateElementLive = useEditorStore((s) => s.updateElementLive);
  const beginChange = useEditorStore((s) => s.beginChange);
  const persist = useEditorStore((s) => s.persist);

  const [scale, setScale] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [textDraft, setTextDraft] = useState('');

  useEffect(() => {
    function computeScale() {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const s = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT, 1.4);
      setScale(s > 0 ? s : 1);
    }
    computeScale();
    const ro = new ResizeObserver(computeScale);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', computeScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeScale);
    };
  }, []);

  useEffect(() => {
    if (!transformerRef.current) return;
    const node = selectedId ? nodeRefs.current.get(selectedId) : null;
    if (node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, elements]);

  const handleSelect = useCallback(
    (id) => (e) => {
      e.cancelBubble = true;
      selectElement(id);
    },
    [selectElement]
  );

  const handleDragStart = useCallback(() => {
    beginChange();
  }, [beginChange]);

  const handleDragMove = useCallback(
    (elm) => (e) => {
      const xy = nodeToStoreXY(elm, e.target);
      updateElementLive(elm.id, xy);
    },
    [updateElementLive]
  );

  const handleDragEnd = useCallback(() => {
    persist();
  }, [persist]);

  const handleTransformStart = useCallback(() => {
    beginChange();
  }, [beginChange]);

  const handleTransformEnd = useCallback(
    (elm) => (e) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);
      const rotation = node.rotation();

      if (elm.type === 'text') {
        const newFontSize = Math.max(8, Math.round(elm.fontSize * scaleX));
        const newWidth = Math.max(30, Math.round(elm.width * scaleX));
        updateElementLive(elm.id, {
          fontSize: newFontSize,
          width: newWidth,
          rotation,
          x: node.x(),
          y: node.y(),
        });
      } else {
        const newWidth = Math.max(8, elm.width * scaleX);
        const newHeight = Math.max(elm.shapeType === 'line' ? 2 : 8, elm.height * scaleY);
        const xy = isCenteredShape(elm)
          ? { x: node.x() - newWidth / 2, y: node.y() - newHeight / 2 }
          : { x: node.x(), y: node.y() };
        updateElementLive(elm.id, { width: newWidth, height: newHeight, rotation, ...xy });
      }
      persist();
    },
    [updateElementLive, persist]
  );

  const startTextEdit = useCallback(
    (elm) => () => {
      if (readOnly) return;
      setEditingId(elm.id);
      setTextDraft(elm.text);
      selectElement(elm.id);
    },
    [readOnly, selectElement]
  );

  const commitTextEdit = useCallback(() => {
    if (!editingId) return;
    beginChange();
    updateElementLive(editingId, { text: textDraft });
    persist();
    setEditingId(null);
  }, [editingId, textDraft, beginChange, updateElementLive, persist]);

  const bgFill = useMemo(() => {
    if (background.type === 'gradient') {
      return {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: CANVAS_WIDTH, y: CANVAS_HEIGHT },
        fillLinearGradientColorStops: [0, background.gradient[0], 1, background.gradient[1]],
      };
    }
    return { fill: background.color };
  }, [background]);

  const editingElm = editingId ? elements.find((e) => e.id === editingId) : null;
  const containerRect = containerRef.current?.getBoundingClientRect();

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative select-none"
      onPointerDown={() => !readOnly && commitTextEdit()}
    >
      <div
        className="relative shadow-2xl ring-1 ring-black/5 bg-white"
        style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }}
      >
        <Stage
          ref={stageRef}
          width={CANVAS_WIDTH * scale}
          height={CANVAS_HEIGHT * scale}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) selectElement(null);
          }}
          onTouchStart={(e) => {
            if (e.target === e.target.getStage()) selectElement(null);
          }}
        >
          <Layer>
            {background.type === 'image' && background.image ? (
              <BackgroundImage src={background.image} />
            ) : (
              <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} {...bgFill} />
            )}

            {elements.map((elm) => {
              const setRef = (node) => {
                if (node) nodeRefs.current.set(elm.id, node);
                else nodeRefs.current.delete(elm.id);
              };
              const events = readOnly
                ? {}
                : {
                    draggable: true,
                    onClick: handleSelect(elm.id),
                    onTap: handleSelect(elm.id),
                    onDragStart: handleDragStart,
                    onDragMove: handleDragMove(elm),
                    onDragEnd: handleDragEnd,
                    onTransformStart: handleTransformStart,
                    onTransformEnd: handleTransformEnd(elm),
                  };

              if (elm.type === 'text') {
                return (
                  <TextElement
                    key={elm.id}
                    ref={setRef}
                    elm={elm}
                    {...events}
                    onDblClick={startTextEdit(elm)}
                    onDblTap={startTextEdit(elm)}
                    visible={editingId !== elm.id}
                  />
                );
              }
              if (elm.type === 'image') {
                return <ImageElement key={elm.id} ref={setRef} elm={elm} {...events} />;
              }
              return <ShapeElement key={elm.id} ref={setRef} elm={elm} {...events} />;
            })}

            {!readOnly && (
              <Transformer
                ref={transformerRef}
                rotateEnabled
                borderStroke="#2563EB"
                borderStrokeWidth={1.5}
                anchorStroke="#2563EB"
                anchorFill="#FFFFFF"
                anchorSize={9}
                anchorCornerRadius={4}
                keepRatio={false}
                boundBoxFunc={(oldBox, newBox) => (newBox.width < 8 || newBox.height < 8 ? oldBox : newBox)}
              />
            )}
          </Layer>
        </Stage>

        {editingElm && containerRect && (
          <textarea
            autoFocus
            value={textDraft}
            onChange={(e) => setTextDraft(e.target.value)}
            onBlur={commitTextEdit}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setEditingId(null);
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                commitTextEdit();
              }
              e.stopPropagation();
            }}
            style={{
              position: 'absolute',
              top: editingElm.y * scale,
              left: editingElm.x * scale,
              width: editingElm.width * scale,
              minHeight: editingElm.height * scale,
              fontFamily: editingElm.fontFamily,
              fontSize: editingElm.fontSize * scale,
              fontWeight: editingElm.fontWeight,
              color: editingElm.color,
              textAlign: editingElm.align,
              letterSpacing: editingElm.letterSpacing ? `${editingElm.letterSpacing * scale}px` : 0,
              lineHeight: editingElm.lineHeight || 1.2,
              transform: `rotate(${editingElm.rotation || 0}deg)`,
              transformOrigin: 'top left',
              background: 'rgba(255,255,255,0.85)',
              outline: '2px dashed #2563EB',
              outlineOffset: 2,
              resize: 'none',
              padding: 0,
              border: 'none',
              overflow: 'hidden',
            }}
          />
        )}
      </div>
    </div>
  );
}

function BackgroundImage({ src }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.src = src;
    image.onload = () => setImg(image);
  }, [src]);
  if (!img) return <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#E2E8F0" />;
  return <ImageBg img={img} />;
}

function ImageBg({ img }) {
  const scale = Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  return (
    <KonvaBgImage
      image={img}
      x={(CANVAS_WIDTH - w) / 2}
      y={(CANVAS_HEIGHT - h) / 2}
      width={w}
      height={h}
      listening={false}
    />
  );
}
