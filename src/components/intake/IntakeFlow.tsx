"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { submitCaseAction } from "@/app/actions/case";
import { ISSUE_TYPE_LABELS, PARTY_ROLE_LABELS } from "@/lib/domain/case";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  issueType: string;
  partyRole: string;
  summary: string;
  relevantDate: string;
  notes: string;
  acknowledged: boolean;
}

const EMPTY_FORM: FormState = {
  issueType: "",
  partyRole: "",
  summary: "",
  relevantDate: "",
  notes: "",
  acknowledged: false,
};

const TOTAL_STEPS = 3;

// ─── Shared input styles ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "#fff",
  border: "1px solid var(--c-border)",
  borderRadius: "6px",
  fontSize: "0.9rem",
  color: "var(--c-fg)",
  fontFamily: "var(--font-body), system-ui, sans-serif",
  outline: "none",
  transition: "border-color 0.15s",
  appearance: "none",
  WebkitAppearance: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--c-fg)",
  fontFamily: "var(--font-body), system-ui, sans-serif",
  marginBottom: "0.5rem",
};

const hintStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "var(--c-muted)",
  fontFamily: "var(--font-body), system-ui, sans-serif",
  marginTop: "0.35rem",
  lineHeight: 1.5,
};

// ─── Step 1: Situation type + role ───────────────────────────────────────────

function Step1({
  form,
  onChange,
  onNext,
}: {
  form: FormState;
  onChange: (field: keyof FormState, value: string) => void;
  onNext: () => void;
}) {
  const canContinue = form.issueType !== "" && form.partyRole !== "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div>
        <label htmlFor="issueType" style={labelStyle}>
          What kind of situation is this?
        </label>
        <select
          id="issueType"
          value={form.issueType}
          onChange={(e) => onChange("issueType", e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {Object.entries(ISSUE_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <p style={hintStyle}>
          Choose the category that best describes your situation. You can add detail in the next step.
        </p>
      </div>

      <div>
        <label style={labelStyle}>What is your role in this situation?</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {Object.entries(PARTY_ROLE_LABELS).map(([value, label]) => (
            <label
              key={value}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                border: `1px solid ${form.partyRole === value ? "var(--c-accent)" : "var(--c-border)"}`,
                borderRadius: "6px",
                background: form.partyRole === value ? "rgba(37,99,235,0.04)" : "#fff",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              <input
                type="radio"
                name="partyRole"
                value={value}
                checked={form.partyRole === value}
                onChange={() => onChange("partyRole", value)}
                style={{ marginTop: "2px", accentColor: "var(--c-accent)", flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--c-fg)",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    marginBottom: "0.15rem",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--c-muted)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {value === "initiating"
                    ? "You believe you have a claim that needs to be addressed."
                    : "Someone has contacted you or you expect to receive a dispute notice."}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="jf-btn jf-btn-primary"
          style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Summary + date ──────────────────────────────────────────────────

function Step2({
  form,
  onChange,
  onNext,
  onBack,
}: {
  form: FormState;
  onChange: (field: keyof FormState, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const charCount = form.summary.trim().length;
  const tooShort = charCount > 0 && charCount < 30;
  const tooLong = charCount > 2000;
  const canContinue = charCount >= 30 && !tooLong;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div>
        <label htmlFor="summary" style={labelStyle}>
          Describe what happened
        </label>
        <textarea
          id="summary"
          value={form.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          rows={6}
          placeholder="Describe the situation in plain language. What happened? What outcome are you seeking? You don't need legal language — just be factual and clear."
          style={{
            ...inputStyle,
            resize: "vertical",
            lineHeight: 1.65,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
          <p style={{ ...hintStyle, margin: 0, color: tooShort ? "#dc2626" : tooLong ? "#dc2626" : "var(--c-muted)" }}>
            {tooShort
              ? `At least 30 characters required (${charCount} so far)`
              : tooLong
              ? `Too long — please keep it under 2000 characters`
              : "Plain language only. No legal claims or formal language required."}
          </p>
          <span
            style={{
              ...hintStyle,
              margin: 0,
              color: tooLong ? "#dc2626" : "var(--c-subtle)",
              flexShrink: 0,
              marginLeft: "1rem",
            }}
          >
            {charCount} / 2000
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="relevantDate" style={labelStyle}>
          When did this situation begin?{" "}
          <span style={{ fontWeight: 400, color: "var(--c-muted)" }}>(optional)</span>
        </label>
        <input
          type="date"
          id="relevantDate"
          value={form.relevantDate}
          onChange={(e) => onChange("relevantDate", e.target.value)}
          style={{ ...inputStyle, maxWidth: "220px" }}
        />
        <p style={hintStyle}>
          The date the key event occurred, or when the situation began. Approximate dates are fine.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} className="jf-btn" style={{ background: "transparent", color: "var(--c-muted)", border: "1px solid var(--c-border)", fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.875rem" }}>
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="jf-btn jf-btn-primary"
          style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Review + acknowledge + submit ───────────────────────────────────

function Step3({
  form,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  error,
}: {
  form: FormState;
  onChange: (field: keyof FormState, value: string | boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string;
}) {
  const canSubmit = form.acknowledged && !isSubmitting;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Review summary */}
      <div style={{ padding: "1.25rem 1.5rem", background: "#f8f7f5", border: "1px solid var(--c-border)", borderRadius: "8px" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "1rem" }}>
          Review your submission
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            { label: "Situation type", value: ISSUE_TYPE_LABELS[form.issueType] ?? form.issueType },
            { label: "Your role", value: PARTY_ROLE_LABELS[form.partyRole] ?? form.partyRole },
            ...(form.relevantDate ? [{ label: "Relevant date", value: form.relevantDate }] : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.08em", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.15rem" }}>
                {label}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {value}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.08em", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.15rem" }}>
              Summary
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", lineHeight: 1.65, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
              {form.summary}
            </div>
          </div>
          {form.notes && (
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.08em", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.15rem" }}>
                Additional notes
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", lineHeight: 1.65, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {form.notes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Optional notes */}
      <div>
        <label htmlFor="notes" style={labelStyle}>
          Anything else to add?{" "}
          <span style={{ fontWeight: 400, color: "var(--c-muted)" }}>(optional)</span>
        </label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={3}
          placeholder="Any context that doesn't fit above. This is optional."
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
          maxLength={500}
        />
      </div>

      {/* Acknowledgement */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          background: form.acknowledged ? "rgba(37,99,235,0.04)" : "#fffbf0",
          border: `1px solid ${form.acknowledged ? "rgba(37,99,235,0.25)" : "#fde68a"}`,
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={form.acknowledged}
          onChange={(e) => onChange("acknowledged", e.target.checked)}
          style={{ marginTop: "2px", accentColor: "var(--c-accent)", flexShrink: 0 }}
        />
        <div
          style={{
            fontSize: "0.82rem",
            color: "#92400e",
            lineHeight: 1.7,
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          <strong>I understand</strong> this is a prototype demonstration. Submitting this form
          creates a test record in a development database. This is not legal advice. No real court,
          government body, or legal institution is connected to this platform. Nothing submitted
          here has legal effect.
        </div>
      </label>

      {/* Error message */}
      {error && (
        <div
          style={{
            padding: "0.875rem 1rem",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "6px",
            fontSize: "0.82rem",
            color: "#dc2626",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="jf-btn"
          style={{
            background: "transparent",
            color: "var(--c-muted)",
            border: "1px solid var(--c-border)",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "0.875rem",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="jf-btn jf-btn-primary"
          style={{ opacity: canSubmit ? 1 : 0.4, cursor: canSubmit ? "pointer" : "not-allowed", minWidth: "160px", justifyContent: "center" }}
        >
          {isSubmitting ? "Submitting…" : "Submit case →"}
        </button>
      </div>
    </div>
  );
}

// ─── Main IntakeFlow component ───────────────────────────────────────────────

export function IntakeFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };


  const goNext = () => {
    setStep((s) => s + 1);
    scrollToTop();
  };

  const goBack = () => {
    setStep((s) => s - 1);
    scrollToTop();
    setError("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    const result = await submitCaseAction({
      issueType: form.issueType,
      partyRole: form.partyRole,
      summary: form.summary,
      relevantDate: form.relevantDate || undefined,
      notes: form.notes || undefined,
    });

    if ("error" in result) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push(`/cases/${result.ref}`);
  };

  return (
    <div ref={topRef}>
      {/* Progress indicator */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isComplete = stepNum < step;
            return (
              <div key={stepNum} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    background: isComplete
                      ? "#16a34a"
                      : isActive
                      ? "var(--c-accent)"
                      : "rgba(148,163,184,0.15)",
                    color: isComplete || isActive ? "#fff" : "var(--c-subtle)",
                    transition: "background 0.2s, color 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {isComplete ? "✓" : stepNum}
                </div>
                {i < TOTAL_STEPS - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background: isComplete ? "#16a34a" : "var(--c-border)",
                      minWidth: "40px",
                      transition: "background 0.2s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: "0.72rem", color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          {step === 1 && "Step 1 of 3 — Situation type"}
          {step === 2 && "Step 2 of 3 — Description"}
          {step === 3 && "Step 3 of 3 — Review and submit"}
        </div>
      </div>

      {/* Step content */}
      {step === 1 && <Step1 form={form} onChange={handleChange} onNext={goNext} />}
      {step === 2 && (
        <Step2
          form={form}
          onChange={handleChange}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {step === 3 && (
        <Step3
          form={form}
          onChange={(field, value) => {
            if (field === "acknowledged") {
              setForm((prev) => ({ ...prev, acknowledged: value as boolean }));
              if (error) setError("");
            } else {
              handleChange(field, value as string | boolean);
            }
          }}
          onBack={goBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      )}
    </div>
  );
}
