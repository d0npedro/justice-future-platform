// ─── Domain types ──────────────────────────────────────────────────────────
// These model the eventual real entities. Currently all data is mock/static.

export type CaseStatus =
  | "intake_complete"
  | "notice_delivered"
  | "response_received"
  | "documents_uploaded"
  | "clarification_in_progress"
  | "settlement_available"
  | "escalation_possible"
  | "resolved";

export type TimelineEventType = "system" | "action" | "message" | "deadline";
export type TimelineEventStatus = "complete" | "current" | "upcoming";

export type DocumentStatus = "verified" | "pending" | "reviewed";
export type MessageType = "system_notice" | "party_message" | "status_update";
export type ActionType = "primary" | "secondary" | "caution";

export interface Party {
  role: "initiating" | "responding";
  label: string;         // e.g. "Party A (Tenant)", abstracted for demo
  description: string;
}

export interface TimelineEvent {
  id: string;
  date: string;          // display string, e.g. "20 January 2026"
  title: string;
  description: string;
  type: TimelineEventType;
  status: TimelineEventStatus;
}

export interface MockDocument {
  id: string;
  name: string;
  fileType: string;      // "PDF", "ZIP", "JPEG"
  uploadedBy: string;    // party label or "System"
  uploadedAt: string;
  status: DocumentStatus;
  statusNote: string;
  description: string;
  size: string;
}

export interface Message {
  id: string;
  from: string;
  type: MessageType;
  sentAt: string;
  subject: string;
  body: string;
  acknowledged: boolean;
}

export interface AvailableAction {
  id: string;
  label: string;
  description: string;
  detail: string;        // what would actually happen in a real case
  type: ActionType;
  deadlineNote?: string;
}

export interface NextSteps {
  current: string;
  ifNoAction: string;
  ifClarificationSucceeds: string;
  ifEscalationRequired: string;
}

export interface DemoCase {
  id: string;
  title: string;
  issueType: string;
  summary: string;
  status: CaseStatus;
  statusLabel: string;
  statusDescription: string;
  createdAt: string;
  deadlineAt: string;
  nextCheckpoint: string;
  daysActive: number;
  caseRef: string;
  parties: Party[];
  timeline: TimelineEvent[];
  documents: MockDocument[];
  messages: Message[];
  actions: AvailableAction[];
  nextSteps: NextSteps;
}

// ─── Mock data ─────────────────────────────────────────────────────────────

export const DEMO_CASES: Record<string, DemoCase> = {
  "rental-deposit-2026": {
    id: "rental-deposit-2026",
    caseRef: "JF-2026-00147",
    title: "Security deposit return — 12 Birch Street, Apt 4",
    issueType: "Rental deposit dispute",
    summary:
      "Party A (tenant) vacated the property on 14 January 2026 after a 2-year tenancy. " +
      "The £1,200 security deposit has not been returned. Party B (landlord) has submitted a " +
      "damage assessment claiming £740 in deductions for cleaning and alleged damage to the " +
      "kitchen. Party A disputes both claims and has submitted photographic evidence taken at " +
      "move-out. The case is currently in structured clarification — Party A must respond to " +
      "the damage assessment by 15 March 2026.",
    status: "clarification_in_progress",
    statusLabel: "Clarification in progress",
    statusDescription:
      "Party B submitted a damage assessment on 10 February. Party A has until 15 March to respond. " +
      "A settlement window opens automatically once both parties have submitted their final positions.",
    createdAt: "20 January 2026",
    deadlineAt: "15 March 2026",
    nextCheckpoint: "Response to damage assessment due",
    daysActive: 47,
    parties: [
      {
        role: "initiating",
        label: "Party A",
        description: "Former tenant. Initiated the case on 20 January 2026.",
      },
      {
        role: "responding",
        label: "Party B",
        description: "Landlord. Received formal notice on 22 January 2026. Submitted response.",
      },
    ],
    timeline: [
      {
        id: "t1",
        date: "20 January 2026",
        title: "Intake submitted",
        description:
          "Party A submitted a structured case description. Case ID assigned. Intake validated against schema.",
        type: "system",
        status: "complete",
      },
      {
        id: "t2",
        date: "22 January 2026",
        title: "Notice delivered to Party B",
        description:
          "Formal notice delivered to Party B outlining the claim and requesting a structured response within 7 days.",
        type: "system",
        status: "complete",
      },
      {
        id: "t3",
        date: "29 January 2026",
        title: "Response received from Party B",
        description:
          "Party B submitted a formal response acknowledging the vacancy and indicating intent to claim deductions.",
        type: "action",
        status: "complete",
      },
      {
        id: "t4",
        date: "2 February 2026",
        title: "Documents uploaded by both parties",
        description:
          "Party A submitted move-out photos, tenancy agreement, and deposit receipt. Case moved into document review.",
        type: "action",
        status: "complete",
      },
      {
        id: "t5",
        date: "10 February 2026",
        title: "Damage assessment submitted — clarification open",
        description:
          "Party B submitted an itemised damage assessment. Case status moved to clarification in progress. Party A has 33 days to respond.",
        type: "message",
        status: "current",
      },
      {
        id: "t6",
        date: "15 March 2026",
        title: "Response deadline — settlement window opens",
        description:
          "Party A's response is due. Once submitted, a structured settlement window opens automatically for both parties.",
        type: "deadline",
        status: "upcoming",
      },
      {
        id: "t7",
        date: "After 22 March 2026",
        title: "Escalation available if unresolved",
        description:
          "If no settlement is reached, either party may escalate. The case record, documents, and audit trail are formatted for formal proceedings.",
        type: "deadline",
        status: "upcoming",
      },
    ],
    documents: [
      {
        id: "doc1",
        name: "Tenancy agreement — signed copy",
        fileType: "PDF",
        uploadedBy: "Party A",
        uploadedAt: "20 Jan 2026, 14:32",
        status: "verified",
        statusNote: "Timestamp and integrity verified on upload",
        description:
          "The signed tenancy agreement establishing the rental terms, deposit amount, and return conditions.",
        size: "1.2 MB",
      },
      {
        id: "doc2",
        name: "Move-out photographs — full set",
        fileType: "ZIP",
        uploadedBy: "Party A",
        uploadedAt: "20 Jan 2026, 14:35",
        status: "verified",
        statusNote: "18 images timestamped by device metadata",
        description:
          "Photographs taken by Party A on vacating date showing the condition of each room. Submitted as evidence against the cleaning and damage claims.",
        size: "34.7 MB",
      },
      {
        id: "doc3",
        name: "Deposit payment receipt",
        fileType: "PDF",
        uploadedBy: "Party A",
        uploadedAt: "20 Jan 2026, 14:37",
        status: "verified",
        statusNote: "Bank statement excerpt confirmed",
        description:
          "Receipt confirming payment of £1,200 security deposit on 12 January 2024 — the start of the tenancy.",
        size: "0.4 MB",
      },
      {
        id: "doc4",
        name: "Landlord damage assessment — itemised",
        fileType: "PDF",
        uploadedBy: "Party B",
        uploadedAt: "10 Feb 2026, 09:14",
        status: "pending",
        statusNote: "Submitted by Party B — awaiting Party A response",
        description:
          "An itemised assessment claiming £480 for professional cleaning and £260 for kitchen surface repair. Party A must respond to this document by 15 March.",
        size: "0.8 MB",
      },
    ],
    messages: [
      {
        id: "m1",
        from: "System",
        type: "system_notice",
        sentAt: "20 Jan 2026, 14:40",
        subject: "Case created — notice scheduled",
        body: "Your case has been registered as JF-2026-00147. A formal notice will be delivered to Party B within 48 hours. You will receive a confirmation when delivery is confirmed.",
        acknowledged: true,
      },
      {
        id: "m2",
        from: "System",
        type: "system_notice",
        sentAt: "22 Jan 2026, 10:15",
        subject: "Notice delivered to Party B",
        body: "Party B has been formally notified of this case. They have 7 days to submit an initial response. You will be notified when they respond.",
        acknowledged: true,
      },
      {
        id: "m3",
        from: "Party B",
        type: "party_message",
        sentAt: "29 Jan 2026, 17:02",
        subject: "Initial response to deposit claim",
        body: "We acknowledge the tenancy ended on 14 January 2026. We are conducting an inspection of the property and will submit a formal damage assessment within 10 days. We intend to claim deductions for cleaning and repair costs as permitted under the tenancy agreement.",
        acknowledged: true,
      },
      {
        id: "m4",
        from: "System",
        type: "status_update",
        sentAt: "2 Feb 2026, 16:00",
        subject: "Documents uploaded — clarification phase entered",
        body: "Both parties have uploaded supporting documents. The case has moved into the clarification phase. Party B may now submit a formal damage assessment, and Party A will have the opportunity to respond.",
        acknowledged: true,
      },
      {
        id: "m5",
        from: "Party B",
        type: "party_message",
        sentAt: "10 Feb 2026, 09:20",
        subject: "Damage assessment submitted — £740 deduction claimed",
        body: "We have submitted an itemised damage assessment to this case. We are claiming £480 for professional cleaning (property was not cleaned to the standard required by clause 12 of the tenancy agreement) and £260 for repair of the kitchen work surface. We are prepared to discuss a structured settlement if Party A disputes these amounts.",
        acknowledged: false,
      },
    ],
    actions: [
      {
        id: "respond",
        label: "Respond to damage assessment",
        description: "Submit your structured response to Party B's damage assessment.",
        detail:
          "In a real case, this opens a structured response form. You describe which deductions you accept, which you dispute, and why. Your response becomes part of the case record and is delivered formally to Party B.",
        type: "primary",
        deadlineNote: "Due 15 March 2026",
      },
      {
        id: "upload",
        label: "Upload additional evidence",
        description: "Add documents, photographs, or other supporting materials.",
        detail:
          "In a real case, uploaded files are timestamped, integrity-checked, and added to the case document record. Both parties can see what has been submitted.",
        type: "secondary",
      },
      {
        id: "extension",
        label: "Request a 7-day extension",
        description: "Ask for more time to respond to Party B's assessment.",
        detail:
          "In a real case, an extension request is sent to Party B. Extensions require mutual agreement. You can provide a brief reason. The deadline adjusts automatically if agreed.",
        type: "secondary",
      },
      {
        id: "settlement",
        label: "Propose a settlement amount",
        description: "Suggest a partial deposit return without waiting for full clarification.",
        detail:
          "In a real case, a settlement proposal is sent to Party B with a proposed amount and brief rationale. If accepted, the case is resolved without escalation. Proposals are part of the case record.",
        type: "secondary",
      },
      {
        id: "escalate",
        label: "Review escalation options",
        description: "See what formal proceedings would look like from here.",
        detail:
          "In a real case, this shows what formal claims process this case could enter. The full case record, audit trail, and documents are pre-formatted for small claims submission. No action is taken by clicking this.",
        type: "caution",
      },
    ],
    nextSteps: {
      current:
        "Review Party B's damage assessment document (uploaded 10 February). Submit your structured response by 15 March 2026 — either accepting the deductions, disputing them with evidence, or proposing a partial settlement.",
      ifNoAction:
        "If no response is submitted by 15 March, the case automatically enters escalation review. The full case record is preserved. Either party may then request formal proceedings.",
      ifClarificationSucceeds:
        "If both parties reach agreement on the deposit amount — either through structured response or a settlement proposal — the case is marked resolved. A resolution record is generated and added to the audit trail.",
      ifEscalationRequired:
        "If no agreement is reached, the case is formatted for formal small claims submission. The full audit trail, all documents, and the complete message history are included. Nothing is lost.",
    },
  },
};

export function getDemoCase(id: string): DemoCase | null {
  return DEMO_CASES[id] ?? null;
}

export const DEMO_CASE_LIST = Object.values(DEMO_CASES);
