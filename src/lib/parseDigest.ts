import { marked } from "marked";

export type DigestSection = {
  id: string;
  level: number;
  title: string;
  html: string;
  diagramSvg?: string;
};

type RawSection = {
  type: string;
  content: string[];
  title: string;
  level: number;
  attrs: { id: string };
};

export function parseDigest(raw: RawSection[]): DigestSection[] {
  return raw
    .filter((s) => s.type === "section")
    .map((s) => {
      const markdown = s.content.filter(Boolean).join("\n\n");
      const html = marked.parse(markdown, { async: false }) as string;
      return {
        id: s.attrs.id,
        level: s.level,
        title: s.title,
        html,
      };
    });
}

export type PrebuiltSection = {
  id: string;
  level: number;
  title: string;
  contentHtml: string;
  diagram?: string;
};

export function fromPrebuiltSections(raw: PrebuiltSection[]): Omit<DigestSection, "diagramSvg">[] {
  return raw.map((s) => ({
    id: s.id,
    level: s.level,
    title: s.title,
    html: s.contentHtml,
  }));
}
