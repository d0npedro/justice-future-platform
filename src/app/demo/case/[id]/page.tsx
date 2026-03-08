import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDemoCase, DEMO_CASE_LIST } from "@/lib/demo/data";
import { CaseDetail } from "@/components/demo/CaseDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return DEMO_CASE_LIST.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const caseData = getDemoCase(id);
  if (!caseData) return { title: "Case not found" };
  return {
    title: `${caseData.title} · Demo · Justice Future Platform`,
    description: `Simulated example case: ${caseData.issueType}. ${caseData.statusLabel}. This is a prototype demo — not a real case.`,
  };
}

export default async function CasePage({ params }: Props) {
  const { id } = await params;
  const caseData = getDemoCase(id);
  if (!caseData) notFound();

  return <CaseDetail caseData={caseData} />;
}
