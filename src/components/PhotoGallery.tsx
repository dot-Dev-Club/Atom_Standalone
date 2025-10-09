import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
// import "./Events.css";

// Utility to preload images and get their dimensions
const preloadImages = async (urls) => {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => resolve({ src, width: img.naturalWidth, height: img.naturalHeight });
          img.onerror = () => resolve({ src, width: 300, height: 200 }); // fallback
        })
    )
  );
};

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => window.matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => window.matchMedia(q).removeEventListener("change", handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new window.ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as [React.RefObject<HTMLDivElement>, { width: number; height: number }];
};

const PhotoGallery = ({ photos }) => {
  const columns = useMedia([
    "(min-width:1500px)",
    "(min-width:1000px)",
    "(min-width:600px)",
    "(min-width:400px)",
  ], [5, 4, 3, 2], 1);
  const [containerRef, size] = useMeasure();
  const width = size.width;
  const [images, setImages] = useState([]);

  useEffect(() => {
    preloadImages(photos).then(setImages);
  }, [photos]);

  const grid = useMemo(() => {
    if (!width || images.length === 0) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return images.map((img) => {
      const aspect = img.width / img.height;
      const w = columnWidth;
      const h = w / aspect;
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const y = colHeights[col];
      colHeights[col] += h;
      return { ...img, x, y, w, h };
    });
  }, [columns, images, width]);

  return (
    <div>
      <div ref={containerRef} className="list" style={{ position: "relative", minHeight: 400 }}>
        {grid.map((item, idx) => (
          <div
            key={item.src}
            className="item-wrapper"
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: item.w,
              height: item.h,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 12px #00000024",
              background: "#00000024",
              padding: 8,
            }}
          >
            <img
              src={item.src}
              alt={`Event ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;