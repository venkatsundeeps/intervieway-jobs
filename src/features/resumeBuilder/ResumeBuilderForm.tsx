"use client";

import { useState } from "react";
import { EXPERIENCE_LEVELS } from "@/src/lib/utils/constants";
import { Input, PrimaryButton, Textarea } from "@/src/components/ui";

const steps = ["Basics", "Education", "Skills", "Projects", "Internships", "Certifications"];

export function ResumeBuilderForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/resume-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="space-y-3 rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-emerald-900">
        <p className="font-semibold">Resume intake submitted successfully.</p>
        <a className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white" href="/book?service=Resume%20from%20Scratch&role=ReactJS%20Developer">Book Resume from Scratch</a>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Step {step + 1} of {steps.length}: {steps[step]}</p>
      <div className={step === 0 ? "space-y-3" : "hidden"}>
        <Input name="fullName" placeholder="Full name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input name="targetRole" placeholder="Target role" required />
        <select name="experienceLevel" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" defaultValue="">
          <option value="" disabled>Select experience level</option>
          {EXPERIENCE_LEVELS.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className={step === 1 ? "block" : "hidden"}><Textarea name="education" placeholder="Education details" required rows={5} /></div>
      <div className={step === 2 ? "block" : "hidden"}><Textarea name="skills" placeholder="Skills (comma separated)" required rows={5} /></div>
      <div className={step === 3 ? "block" : "hidden"}><Textarea name="projects" placeholder="Projects" required rows={5} /></div>
      <div className={step === 4 ? "block" : "hidden"}><Textarea name="internships" placeholder="Internships" rows={5} /></div>
      <div className={step === 5 ? "block" : "hidden"}><Textarea name="certifications" placeholder="Certifications" rows={5} /></div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-2">
        <PrimaryButton type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</PrimaryButton>
        {step < steps.length - 1 ? (
          <PrimaryButton type="button" onClick={() => setStep((s) => s + 1)} className="ml-auto">Next</PrimaryButton>
        ) : (
          <PrimaryButton type="submit" disabled={loading} className="ml-auto">{loading ? "Submitting..." : "Submit"}</PrimaryButton>
        )}
      </div>
    </form>
  );
}
