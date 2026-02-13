import "server-only";
import admin from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firebase Admin SDK Initialization
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (e) {
    console.error("Firebase Admin SDK initialization error:", e);
  }
}

export const db = getFirestore();
export const adminAuth = admin.auth();
