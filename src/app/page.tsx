import Link from "next/link";
import { weeks } from "@/data/weeks";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm font-medium text-blue-600">신용평가모델</p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        AI 기반 신용평가모형 개발 — 강의 요약
      </h1>
      <p className="text-neutral-500 mb-12">주차별 강의 내용을 요약하고 정리합니다.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {weeks.map((w) => {
          const ready = Boolean(w.sections || w.video);
          const card = (
            <div
              className={`h-full rounded-xl border p-5 transition-colors ${
                ready
                  ? "border-neutral-200 hover:border-blue-400 hover:shadow-md"
                  : "border-neutral-100 text-neutral-400"
              }`}
            >
              <p className="text-xs font-semibold text-blue-600 mb-1">{w.number}주차</p>
              <p className="text-sm font-medium leading-snug line-clamp-3">{w.pageTitle}</p>
              {!ready && <p className="mt-3 text-xs text-neutral-400">준비 중</p>}
            </div>
          );
          return ready ? (
            <Link key={w.number} href={`/week/${w.number}`}>
              {card}
            </Link>
          ) : (
            <div key={w.number}>{card}</div>
          );
        })}
      </div>
    </main>
  );
}
