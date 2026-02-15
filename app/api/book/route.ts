import { NextResponse } from "next/server";
import { bookingSchema } from "@/src/features/booking/schema";
import { createBooking, createWaitlistRequest, findProfessionalByRoleTitle } from "@/src/lib/firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });

  const professional = await findProfessionalByRoleTitle(parsed.data.targetRole);
  const availability = professional ? "AVAILABLE" : "WAITLISTED";

  await createBooking({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    targetRole: parsed.data.targetRole,
    selectedService: parsed.data.selectedService,
    roleAvailability: availability,
    professionalId: professional?.id ?? null,
    preferredDate: parsed.data.preferredDate || null,
    preferredTime: parsed.data.preferredTime || null,
    status: "REQUESTED",
    createdAt: new Date().toISOString(),
  });

  if (!professional) {
    await createWaitlistRequest({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      targetRole: parsed.data.targetRole,
      experienceLevel: parsed.data.experienceLevel || "Not specified",
      selectedService: parsed.data.selectedService,
      notes: parsed.data.notes || "",
      sourcePage: parsed.data.sourcePage || "/book",
      createdAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true, availability });
}
