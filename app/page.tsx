import { RoleServiceSelector } from "@/src/features/roles/RoleServiceSelector";
import { getActiveProfessionals } from "@/src/lib/firebase/firestore";

export default async function Home() {
  const professionals = await getActiveProfessionals();

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 md:py-12">
      <section className="space-y-4 text-center">
        <p className="text-sm font-semibold text-blue-600">Intervieway MVP</p>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Role-specific career help from real professionals.</h1>
        <p className="mx-auto max-w-2xl text-slate-600">Choose your target role, choose your service, and book immediately. If your role is not live yet, join the waitlist and help us onboard experts faster.</p>
        <RoleServiceSelector roles={professionals.map((item) => ({ roleTitle: item.roleTitle }))} />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Available Right Now</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {professionals.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="font-semibold text-slate-900">{item.roleTitle}</p>
              <p className="text-sm text-slate-600">{item.name} · {item.company} · {item.yearsExp}+ years</p>
              <a className="mt-3 inline-block text-sm font-semibold text-slate-900 underline" href={`/roles/${item.roleSlug}`}>View services</a>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl bg-slate-900 p-6 text-white md:grid-cols-3">
        {["Pick Role + Service", "Book instantly", "Get expert guidance"].map((item, index) => (
          <div key={item}><p className="text-sm opacity-70">0{index + 1}</p><p className="font-semibold">{item}</p></div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold">Trusted by early-career jobseekers</h3>
          <p className="text-sm text-slate-600">Structured sessions, role-specific professionals, and quick response time.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold">FAQs</h3>
          <p className="text-sm text-slate-600">No role available? Join waitlist and we prioritize onboarding by demand.</p>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white p-3 md:hidden">
        <a href="#" className="block rounded-lg bg-slate-900 py-2 text-center text-sm font-semibold text-white">Start Booking</a>
      </div>
    </main>
  );
}
