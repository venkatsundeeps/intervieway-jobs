import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase/config";
import type {
  Booking,
  Professional,
  ResumeIntake,
  Service,
  WaitlistRequest,
} from "@/src/lib/utils/types";

const mapDocs = <T>(snapshot: Awaited<ReturnType<typeof getDocs>>) =>
  snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Record<string, unknown>) }) as T);

export async function getActiveProfessionals() {
  const q = query(
    collection(db, "professionals"),
    where("isActive", "==", true),
    orderBy("createdAt", "asc"),
  );
  const docs = await getDocs(q);
  return mapDocs<Professional>(docs);
}

export async function getProfessionalBySlug(slug: string) {
  const q = query(
    collection(db, "professionals"),
    where("roleSlug", "==", slug),
    where("isActive", "==", true),
  );
  const docs = await getDocs(q);
  return docs.empty ? null : ({ id: docs.docs[0].id, ...docs.docs[0].data() } as Professional);
}

export async function getServicesByProfessionalId(professionalId: string) {
  const q = query(
    collection(db, "services"),
    where("professionalId", "==", professionalId),
    where("isActive", "==", true),
    orderBy("sortOrder", "asc"),
  );
  const docs = await getDocs(q);
  return mapDocs<Service>(docs);
}

export async function getServiceNamesForRoleSlug(roleSlug: string) {
  const professional = await getProfessionalBySlug(roleSlug);
  if (!professional) return [];
  const services = await getServicesByProfessionalId(professional.id);
  return services.map((item) => item.name);
}

export async function findProfessionalByRoleTitle(roleTitle: string) {
  const q = query(
    collection(db, "professionals"),
    where("roleTitle", "==", roleTitle),
    where("isActive", "==", true),
  );
  const docs = await getDocs(q);
  return docs.empty ? null : ({ id: docs.docs[0].id, ...docs.docs[0].data() } as Professional);
}

export async function createBooking(payload: Booking) {
  await addDoc(collection(db, "bookings"), payload);
}

export async function createWaitlistRequest(payload: WaitlistRequest) {
  await addDoc(collection(db, "waitlistRequests"), payload);
}

export async function createResumeIntake(payload: ResumeIntake) {
  await addDoc(collection(db, "resumeIntakes"), payload);
}

export async function getWaitlistRequests() {
  const q = query(collection(db, "waitlistRequests"), orderBy("createdAt", "desc"));
  const docs = await getDocs(q);
  return mapDocs<WaitlistRequest>(docs);
}

export async function getProfessionalById(id: string) {
  const d = await getDoc(doc(db, "professionals", id));
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() } as Professional;
}
