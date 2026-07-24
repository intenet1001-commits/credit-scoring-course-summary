import type { DigestSection as DigestSectionType } from "@/lib/parseDigest";
import { AnimatedDiagram } from "@/components/AnimatedDiagram";

const headingClass: Record<number, string> = {
  2: "text-3xl font-bold mt-16 mb-4",
  3: "text-2xl font-bold mt-12 mb-4",
};

export function DigestSection({
  section,
  diagramSvg,
}: {
  section: DigestSectionType;
  diagramSvg?: string;
}) {
  const Heading = section.level === 2 ? "h2" : "h3";

  return (
    <section id={section.id} className="scroll-mt-24">
      <Heading className={headingClass[section.level] ?? "text-xl font-bold mt-8 mb-4"}>
        {section.title}
      </Heading>
      <div
        className="prose prose-neutral max-w-none prose-mark:bg-yellow-200 prose-mark:px-0.5 prose-mark:rounded"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
      {diagramSvg ? <AnimatedDiagram svg={diagramSvg} /> : null}
    </section>
  );
}
