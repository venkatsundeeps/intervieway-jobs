import { z } from "zod";

export const resumeIntakeSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  targetRole: z.string().min(2),
  experienceLevel: z.string().min(2),
  education: z.string().min(2),
  skills: z.string().min(2),
  projects: z.string().min(2),
  internships: z.string().optional().default(""),
  certifications: z.string().optional().default(""),
});

export type ResumeIntakeInput = z.infer<typeof resumeIntakeSchema>;
