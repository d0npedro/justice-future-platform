"use server";

import { revalidatePath } from "next/cache";
import { createCase, updateCaseStatus } from "@/lib/db/cases";
import { CASE_STATUSES } from "@/lib/domain/case";
import type { CaseStatus, NewCaseInput } from "@/lib/domain/case";

// ─── Submit a new case ───────────────────────────────────────────────────────

export async function submitCaseAction(
  input: NewCaseInput
): Promise<{ ref: string } | { error: string }> {
  // Validate required fields
  if (!input.issueType || !input.partyRole || !input.summary?.trim()) {
    return { error: "Required fields are missing." };
  }
  if (input.summary.trim().length < 30) {
    return { error: "Please describe the situation in at least 30 characters." };
  }
  if (input.summary.trim().length > 2000) {
    return { error: "Summary must be under 2000 characters." };
  }

  try {
    const caseRecord = await createCase(input);
    return { ref: caseRecord.ref };
  } catch (err) {
    console.error("[submitCaseAction] Error:", err);
    return {
      error:
        "Unable to submit your case right now. This may be a database configuration issue. Please try again.",
    };
  }
}

// ─── Update case status (internal use only) ──────────────────────────────────
// Called from the internal dev panel. Not behind auth yet — access is by
// knowledge of the /internal route only.

export async function updateStatusAction(formData: FormData): Promise<void> {
  const ref = formData.get("ref") as string;
  const status = formData.get("status") as string;

  if (!ref || !status || !CASE_STATUSES.includes(status as CaseStatus)) {
    return; // silently ignore bad input from the form
  }

  await updateCaseStatus(ref, status as CaseStatus);

  revalidatePath("/internal");
  revalidatePath(`/cases/${ref}`);
}
