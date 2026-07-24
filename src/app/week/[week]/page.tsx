import Link from "next/link";
import { notFound } from "next/navigation";
import { getWeek, weeks } from "@/data/weeks";
import { DigestSection } from "@/components/DigestSection";
import { ShortsCard } from "@/components/ShortsCard";
import { WebtoonCard } from "@/components/WebtoonCard";
import { WeekTabs } from "@/components/WeekTabs";
import { AudioNarration } from "@/components/AudioNarration";

export function generateStaticParams() {
  return weeks.map((w) => ({ week: String(w.number) }));
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const weekNumber = Number(week);
  const config = getWeek(weekNumber);
  if (!config) notFound();

  const tabs = [
    config.sections
      ? {
          key: "summary",
          label: "요약",
          icon: "📄",
          content: (
            <>
              {config.audio ? <AudioNarration src={config.audio} /> : null}
              <article>
                {config.sections.map((section) => (
                  <DigestSection key={section.id} section={section} diagramSvg={section.diagramSvg} />
                ))}
              </article>
            </>
          ),
        }
      : null,
    config.video
      ? {
          key: "shorts",
          label: "쇼츠",
          icon: "🎬",
          content: <ShortsCard src={config.video.src} poster={config.video.poster} />,
        }
      : null,
    config.webtoon
      ? {
          key: "webtoon",
          label: "웹툰",
          icon: "🎨",
          content: <WebtoonCard src={config.webtoon} />,
        }
      : null,
  ].filter((t) => t !== null);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← 전체 목차
      </Link>

      <p className="mt-4 text-sm font-medium text-blue-600">{weekNumber}주차</p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-8">{config.pageTitle}</h1>

      {tabs.length > 0 ? (
        <WeekTabs tabs={tabs} />
      ) : (
        <p className="text-neutral-500">이 주차 자료는 준비 중입니다.</p>
      )}
    </main>
  );
}
