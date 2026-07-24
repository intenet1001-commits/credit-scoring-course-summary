"use client";

export function ShortsCard({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-black">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full aspect-video"
      />
    </div>
  );
}
