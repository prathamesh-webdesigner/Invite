import { useEffect, useState } from 'react';

const cache = new Map();

export function useImage(src) {
  const [image, setImage] = useState(cache.get(src) || null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }
    if (cache.has(src)) {
      setImage(cache.get(src));
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      cache.set(src, img);
      setImage(img);
    };
    img.onerror = () => setImage(null);
  }, [src]);

  return image;
}
