import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  targetRole: z.string().min(2),
  selectedService: z.string().min(2),
  preferredDate: z.string().optional().or(z.literal("")),
  preferredTime: z.string().optional().or(z.literal("")),
  experienceLevel: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  sourcePage: z.string().optional().default("/book"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
