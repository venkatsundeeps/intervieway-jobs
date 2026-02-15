export type AvailabilityStatus = "AVAILABLE" | "WAITLISTED";

export interface Professional {
  id: string;
  name: string;
  roleTitle: string;
  roleSlug: string;
  company: string;
  yearsExp: number;
  bio: string;
  avatarUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  professionalId: string;
  name: string;
  description: string;
  priceINR: number;
  durationMinutes: number;
  isActive: boolean;
  sortOrder: number;
}

export interface Booking {
  id?: string;
  fullName: string;
  email: string;
  targetRole: string;
  selectedService: string;
  roleAvailability: AvailabilityStatus;
  professionalId: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  status: "REQUESTED";
  createdAt: string;
}

export interface WaitlistRequest {
  id?: string;
  fullName: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  selectedService: string;
  notes: string;
  sourcePage: string;
  createdAt: string;
}

export interface ResumeIntake {
  id?: string;
  fullName: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  educationJson: string;
  skillsJson: string;
  projectsJson: string;
  internshipsJson: string;
  certificationsJson: string;
  createdAt: string;
}
