// ─── Domain types for real case records ────────────────────────────────────
// These types model the persistence layer. They intentionally overlap with
// the Phase 3 demo domain model but are not derived from it — the demo model
// was conceptual; these types reflect what is actually stored and retrieved.

export type CaseStatus =
  | "submitted"
  | "under_review"
  | "clarification_requested"
  | "ready_for_next_step";

export const CASE_STATUSES: CaseStatus[] = [
  "submitted",
  "under_review",
  "clarification_requested",
  "ready_for_next_step",
];

export const STATUS_LABELS: Record<CaseStatus, string> = {
  submitted:                "Submitted",
  under_review:             "Under review",
  clarification_requested:  "Clarification requested",
  ready_for_next_step:      "Ready for next step",
};

export const STATUS_GUIDANCE: Record<CaseStatus, string> = {
  submitted:
    "Your case record has been created and is in the queue. No action is required from you at this stage.",
  under_review:
    "Your case is being reviewed. This phase involves initial assessment only. Check back here for updates.",
  clarification_requested:
    "Some additional context may be needed before this case can proceed. Updates will appear on this page.",
  ready_for_next_step:
    "The initial review of this case is complete. In a real case, structured next-step options would be presented here. This is a prototype — the options are currently illustrative.",
};

export const ISSUE_TYPE_LABELS: Record<string, string> = {
  rental_deposit:   "Rental / deposit dispute",
  contract_service: "Contract or service dispute",
  consumer:         "Consumer complaint",
  employment:       "Employment matter",
  neighbour:        "Neighbour dispute",
  professional:     "Professional / business dispute",
  other:            "Other",
};

export const PARTY_ROLE_LABELS: Record<string, string> = {
  initiating: "Raising a dispute",
  responding: "Notified of a dispute",
};

// Shape of a row as returned from the database
export interface CaseRecord {
  id: number;
  ref: string;
  status: CaseStatus;
  issue_type: string;
  party_role: string;
  summary: string;
  relevant_date: string | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// Shape of validated input before DB write
export interface NewCaseInput {
  issueType: string;
  partyRole: string;
  summary: string;
  relevantDate?: string;
  notes?: string;
}
