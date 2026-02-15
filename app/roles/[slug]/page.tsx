import { SERVICE_OPTIONS } from "@/src/lib/utils/constants";
import { getProfessionalBySlug, getServicesByProfessionalId } from "@/src/lib/firebase/firestore";

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const professional = await getProfessionalBySlug(slug);

  if (!professional) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
        <h1 className="text-3xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="text-slate-600">This role is not live yet. Pick a service and join waitlist.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {SERVICE_OPTIONS.map((service) => (
            <a key={service} href={`/book?role=${encodeURIComponent(slug.replace(/-/g, " "))}&service=${encodeURIComponent(service)}`} className="rounded-xl border border-slate-200 bg-white p-4">
              {service}
            </a>
          ))}
        </div>
      </main>
    );
  }

  const services = await getServicesByProfessionalId(professional.id);

  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">{professional.roleTitle}</h1>
      <p className="text-slate-600">{professional.name} · {professional.company} · {professional.yearsExp}+ years</p>
      <p>{professional.bio}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((service) => (
          <a key={service.id} href={`/book?role=${encodeURIComponent(professional.roleTitle)}&service=${encodeURIComponent(service.name)}`} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-semibold">{service.name}</p>
            <p className="text-sm text-slate-600">{service.description}</p>
            <p className="mt-2 text-sm">₹{service.priceINR} · {service.durationMinutes} mins</p>
          </a>
        ))}
      </div>
    </main>
  );
}
