"use client";

import { useEffect, useRef } from "react";

export function AnimatedDiagram({ svg }: { svg: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Re-assigning innerHTML restarts SMIL (<animate>) playback.
            el.innerHTML = el.innerHTML;
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-6 w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-[#f8f7f4]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
