import { NextResponse } from "next/server";
import { resumeIntakeSchema } from "@/src/features/resumeBuilder/schema";
import { createResumeIntake } from "@/src/lib/firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = resumeIntakeSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });

  await createResumeIntake({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    targetRole: parsed.data.targetRole,
    experienceLevel: parsed.data.experienceLevel,
    educationJson: parsed.data.education,
    skillsJson: parsed.data.skills,
    projectsJson: parsed.data.projects,
    internshipsJson: parsed.data.internships,
    certificationsJson: parsed.data.certifications,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
