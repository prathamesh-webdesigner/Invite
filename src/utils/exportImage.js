// Exports the Konva Stage (the invitation canvas only — no surrounding UI) as PNG or JPG.
import { CANVAS_WIDTH } from '../data/templates';

const TARGET_PX_WIDTH = 1500; // high-resolution export target width

function withDeselected(selectedId, selectElement, fn) {
  return new Promise((resolve, reject) => {
    if (selectedId) selectElement(null);
    // wait a frame so the Transformer detaches and the layer redraws before capture
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          const result = fn();
          if (selectedId) selectElement(selectedId);
          resolve(result);
        } catch (err) {
          if (selectedId) selectElement(selectedId);
          reject(err);
        }
      });
    });
  });
}

export async function exportStageAsImage(stage, { format = 'png', selectedId, selectElement } = {}) {
  if (!stage) throw new Error('Canvas is not ready yet.');
  const pixelRatio = TARGET_PX_WIDTH / CANVAS_WIDTH;

  const dataUrl = await withDeselected(selectedId, selectElement, () =>
    stage.toDataURL({
      pixelRatio,
      mimeType: format === 'jpg' ? 'image/jpeg' : 'image/png',
      quality: format === 'jpg' ? 0.95 : 1,
    })
  );

  return dataUrl;
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
