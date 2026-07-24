"use client";

import { useState } from "react";
import Image from "next/image";

export function WebtoonCard({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 cursor-zoom-in"
      >
        <Image
          src={src}
          alt="이번 주 강의 웹툰 요약"
          width={1024}
          height={1536}
          className="w-full h-auto"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <Image
            src={src}
            alt="이번 주 강의 웹툰 요약"
            width={1024}
            height={1536}
            className="max-h-[90vh] w-auto rounded-lg"
          />
        </div>
      ) : null}
    </>
  );
}
