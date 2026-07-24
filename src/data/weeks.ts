import week1Raw from "@/data/week1.json";
import week2Raw from "@/data/week2-sections.json";
import week1RealRaw from "@/data/week1-real-sections.json";
import week2RealRaw from "@/data/week2-real-sections.json";
import week3RealRaw from "@/data/week3-real-sections.json";
import week6RealRaw from "@/data/week6-real-sections.json";
import week7RealRaw from "@/data/week7-real-sections.json";
import week8RealRaw from "@/data/week8-real-sections.json";
import week9RealRaw from "@/data/week9-real-sections.json";
import { parseDigest, fromPrebuiltSections, type DigestSection, type PrebuiltSection } from "@/lib/parseDigest";
import { loadSvg } from "@/lib/loadSvg";

export type WeekConfig = {
  number: number;
  pageTitle: string;
  sections?: DigestSection[];
  video?: { src: string; poster: string };
  webtoon?: string;
  audio?: string;
};

// NOTE: file/function names below (week1.json, week2-sections.json, assets/week1,
// assets/week2) don't match the actual course week numbers — they were extracted
// before the correct week numbers were known. week1.json's content is actually
// week 4, and week2-sections.json's content is actually week 5.

function prebuiltSections(raw: PrebuiltSection[]): DigestSection[] {
  const sections = fromPrebuiltSections(raw);
  return sections.map((s, i) => ({
    ...s,
    diagramSvg: raw[i].diagram ? loadSvg(raw[i].diagram!) : undefined,
  }));
}

function week4Sections(): DigestSection[] {
  const sections = parseDigest(week1Raw);
  const diagrams: Record<number, string> = {
    1: "week1/01-credit-process.svg",
    2: "week1/02-fine-coarse-classing.svg",
    3: "week1/03-logistic-regression.svg",
  };
  return sections.map((s, i) => ({
    ...s,
    diagramSvg: diagrams[i] ? loadSvg(diagrams[i]) : undefined,
  }));
}

function video(n: number) {
  return { src: `/videos/week${n}.mp4`, poster: `/videos/week${n}-poster.jpg` };
}

function webtoon(n: number) {
  return `/webtoons/week${n}.png`;
}

function audio(n: number) {
  return `/audio/week${n}.mp3`;
}

export const weeks: WeekConfig[] = [
  {
    number: 1,
    pageTitle: "AI와 신용평가: 개념, 역사, 모델 개발 및 기업 도입 전략",
    sections: prebuiltSections(week1RealRaw as PrebuiltSection[]),
    video: video(1),
    webtoon: webtoon(1),
    audio: audio(1),
  },
  {
    number: 2,
    pageTitle: "AI와 신용평가모형: 개인/기업 신용평가, 전통/대안 비교, 진화와 적용",
    sections: prebuiltSections(week2RealRaw as PrebuiltSection[]),
    video: video(2),
    webtoon: webtoon(2),
    audio: audio(2),
  },
  {
    number: 3,
    pageTitle: "AI 기반 개인 신용평가 모형 개발 및 활용: 데이터, 기법, 동향",
    sections: prebuiltSections(week3RealRaw as PrebuiltSection[]),
    video: video(3),
    webtoon: webtoon(3),
    audio: audio(3),
  },
  {
    number: 4,
    pageTitle: "AI 기반 신용평가모형 개발: SVM, 로지스틱 회귀, 스코어카드 스케일링",
    sections: week4Sections(),
    video: video(4),
    webtoon: webtoon(4),
    audio: audio(4),
  },
  {
    number: 5,
    pageTitle: "신용평가모형 진화와 AI: 방법론, 금융 AI 동향",
    sections: prebuiltSections(week2Raw as PrebuiltSection[]),
    video: video(5),
    webtoon: webtoon(5),
    audio: audio(5),
  },
  {
    number: 6,
    pageTitle: "기업 신용평가모형: AI 방법론, 데이터 파이프라인, 등급 결합",
    sections: prebuiltSections(week6RealRaw as PrebuiltSection[]),
    video: video(6),
    webtoon: webtoon(6),
    audio: audio(6),
  },
  {
    number: 7,
    pageTitle: "AI 신용평가 모형: 성능 검증, 공정성 및 규제 동향",
    sections: prebuiltSections(week7RealRaw as PrebuiltSection[]),
    video: video(7),
    webtoon: webtoon(7),
    audio: audio(7),
  },
  {
    number: 8,
    pageTitle: "개인 및 기업 AI 생산성 향상: 전략, 도구, 실천 방안",
    sections: prebuiltSections(week8RealRaw as PrebuiltSection[]),
    video: video(8),
    webtoon: webtoon(8),
    audio: audio(8),
  },
  {
    number: 9,
    pageTitle: "AI 신용평가 규제 동향: 미국, 유럽, 한국 금융 분야 가이드라인",
    sections: prebuiltSections(week9RealRaw as PrebuiltSection[]),
    video: video(9),
    webtoon: webtoon(9),
    audio: audio(9),
  },
];

export function getWeek(n: number): WeekConfig | undefined {
  return weeks.find((w) => w.number === n);
}
