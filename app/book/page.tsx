import { BookingForm } from "@/src/features/booking/BookingForm";
import { findProfessionalByRoleTitle } from "@/src/lib/firebase/firestore";

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const role = typeof params.role === "string" ? params.role : "ReactJS Developer";
  const service = typeof params.service === "string" ? params.service : "Resume Review";

  const professional = await findProfessionalByRoleTitle(role);
  const available = Boolean(professional);

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold">{available ? "Book your session" : "Join role waitlist"}</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Target role</p>
        <p className="font-semibold">{role}</p>
        <p className="mt-2 text-sm text-slate-500">Selected service</p>
        <p className="font-semibold">{service}</p>
      </div>

      {available && professional ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-semibold">{professional.name}</p>
          <p className="text-sm text-slate-600">{professional.company} · {professional.yearsExp}+ years</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Role-specific guidance</li>
            <li>Actionable feedback and recordings</li>
            <li>Fast response after booking request</li>
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">We’re onboarding experts for this role. Join waitlist to get priority when we launch it.</p>
      )}

      <BookingForm role={role} service={service} available={available} />
    </main>
  );
}
