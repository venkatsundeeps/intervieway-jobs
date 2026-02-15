import { getActiveProfessionals } from "@/src/lib/firebase/firestore";

export default async function RolesPage() {
  const professionals = await getActiveProfessionals();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Available Roles</h1>
      <p className="mt-1 text-slate-600">Book sessions with currently active professionals.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {professionals.map((item) => (
          <a key={item.id} href={`/roles/${item.roleSlug}`} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-semibold">{item.roleTitle}</p>
            <p className="text-sm text-slate-600">{item.name} · {item.company}</p>
          </a>
        ))}
      </div>
      <p className="mt-6 rounded-xl border border-slate-200 p-4 text-sm text-slate-700">Role not listed? Choose a service and join waitlist from the booking page.</p>
    </main>
  );
}
