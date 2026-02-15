import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getWaitlistRequests } from "@/src/lib/firebase/firestore";

function countBy<T extends string>(items: T[]) {
  return Object.entries(items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]);
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  const password = typeof params.password === "string" ? params.password : "";
  if (password !== process.env.ADMIN_PASSWORD) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-bold">Admin Access</h1>
        <p className="mt-2 text-sm text-slate-600">Append ?password=ADMIN_PASSWORD to access dashboard.</p>
      </main>
    );
  }

  const waitlist = await getWaitlistRequests();
  const roleCounts = countBy(waitlist.map((item) => item.targetRole));
  const serviceCounts = countBy(waitlist.map((item) => item.selectedService));

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4"><p className="text-sm text-slate-600">Total Waitlist</p><p className="text-2xl font-bold">{waitlist.length}</p></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4"><h2 className="font-semibold">Demand by Role</h2>{roleCounts.map(([role, count]) => <p key={role} className="text-sm">{role}: {count}</p>)}</div>
        <div className="rounded-xl border p-4"><h2 className="font-semibold">Demand by Service</h2>{serviceCounts.map(([service, count]) => <p key={service} className="text-sm">{service}: {count}</p>)}</div>
      </div>
      <div className="rounded-xl border p-4">
        <div className="mb-2 flex items-center justify-between"><h2 className="font-semibold">Recent Waitlist</h2><a className="text-sm underline" href={`/api/admin/export?password=${password}`}>Export CSV</a></div>
        <div className="overflow-auto">
          <table className="w-full text-sm"><thead><tr className="text-left"><th>Name</th><th>Email</th><th>Role</th><th>Service</th></tr></thead>
            <tbody>{waitlist.slice(0, 20).map((item) => <tr key={`${item.email}-${item.createdAt}`}><td>{item.fullName}</td><td>{item.email}</td><td>{item.targetRole}</td><td>{item.selectedService}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
