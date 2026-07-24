import { notFound } from "next/navigation";
import { getWeek, weeks } from "@/data/weeks";
import { WeekDetail, type SectionData } from "@/components/WeekDetail";

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

  const idx = weeks.findIndex((w) => w.number === weekNumber);
  const prevWeek = weeks[idx - 1];
  const nextWeek = weeks[idx + 1];

  const sections: SectionData[] = (config.sections ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    html: s.html,
    svg: s.diagramSvg,
  }));

  return (
    <WeekDetail
      weekNum={weekNumber}
      title={config.pageTitle}
      sections={sections}
      audio={config.audio ?? `/audio/week${weekNumber}.mp3`}
      video={config.video?.src ?? `/videos/week${weekNumber}.mp4`}
      poster={config.video?.poster ?? `/videos/week${weekNumber}-poster.jpg`}
      webtoon={config.webtoon ?? `/webtoons/week${weekNumber}.png`}
      prev={prevWeek ? { number: prevWeek.number, label: `${prevWeek.number}주차` } : undefined}
      next={
        nextWeek
          ? {
              number: nextWeek.number,
              label: `${nextWeek.number}주차 · ${nextWeek.pageTitle.split(":")[0]}`,
            }
          : undefined
      }
    />
  );
}
