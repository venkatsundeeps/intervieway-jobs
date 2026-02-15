import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const professionals = [
  {
    name: "Aarav Sharma",
    roleTitle: "ReactJS Developer",
    roleSlug: "reactjs-developer",
    company: "Product Startup",
    yearsExp: 4,
    bio: "Frontend specialist helping candidates crack React interviews.",
    avatarUrl: "https://i.pravatar.cc/200?img=5",
    isActive: true,
  },
  {
    name: "Nikhil Rao",
    roleTitle: "ServiceNow Developer",
    roleSlug: "servicenow-developer",
    company: "Enterprise IT",
    yearsExp: 6,
    bio: "ServiceNow workflow and platform expert.",
    avatarUrl: "https://i.pravatar.cc/200?img=12",
    isActive: true,
  },
];

const serviceTemplates = [
  ["Resume from Scratch", "Build ATS-ready resume from zero", 1499, 60],
  ["Resume Review", "Detailed review with actionable edits", 799, 45],
  ["Mock Interview", "Role-specific mock interview with feedback", 1999, 75],
  ["Career Guidance", "Roadmap and job strategy call", 999, 45],
];

for (const pro of professionals) {
  const existingQ = query(collection(db, "professionals"), where("roleSlug", "==", pro.roleSlug));
  const existing = await getDocs(existingQ);
  const professionalId = existing.empty
    ? (await addDoc(collection(db, "professionals"), { ...pro, createdAt: new Date().toISOString() })).id
    : existing.docs[0].id;

  for (const [index, service] of serviceTemplates.entries()) {
    const [name, description, priceINR, durationMinutes] = service;
    const serviceQ = query(collection(db, "services"), where("professionalId", "==", professionalId), where("name", "==", name));
    const serviceDocs = await getDocs(serviceQ);
    if (serviceDocs.empty) {
      await addDoc(collection(db, "services"), {
        professionalId,
        name,
        description,
        priceINR,
        durationMinutes,
        isActive: true,
        sortOrder: index + 1,
      });
    }
  }
}

console.log("Seed complete");
