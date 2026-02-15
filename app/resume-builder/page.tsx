import { ResumeBuilderForm } from "@/src/features/resumeBuilder/ResumeBuilderForm";

export default function ResumeBuilderPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">Resume Builder Intake</h1>
      <p className="text-slate-600">Share your background once. We use this to prepare a role-specific resume draft.</p>
      <ResumeBuilderForm />
    </main>
  );
}
