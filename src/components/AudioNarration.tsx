"use client";

export function AudioNarration({ src }: { src: string }) {
  return (
    <div className="mb-8 flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
      <span className="text-lg">🔊</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-neutral-500 mb-1">음성으로 듣기</p>
        <audio src={src} controls preload="none" className="w-full h-9" />
      </div>
    </div>
  );
}
