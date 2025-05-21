// src/app/api/submit-study-data/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type {
  ProgressiveSavePayload,
  CorrelationResponsePayload,
  CRTData,
  DemographicsData,
} from "@/types/correlation";

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

let db: admin.firestore.Firestore | null = null;
try {
  db = getFirestore();
} catch (e) {
  console.error("Error getting Firestore instance:", e);
}

export async function POST(request: NextRequest) {
  if (!db) {
    console.error("Firestore DB not initialized. Cannot process request.");
    return NextResponse.json(
      { message: "Server configuration error: Firestore not available." },
      { status: 500 }
    );
  }

  try {
    const payload = (await request.json()) as ProgressiveSavePayload;
    const { userId, dataType, data } = payload;

    if (!userId || !dataType || !data) {
      return NextResponse.json(
        { message: "Missing required data fields (userId, dataType, data)." },
        { status: 400 }
      );
    }

    const participantRef = db.collection("studyParticipants").doc(userId);
    const timestamp = new Date().toISOString();
    const updateData: Partial<admin.firestore.DocumentData> = {
      userId,
      submittedAt: timestamp,
    };

    switch (dataType) {
      case "correlationResponse":
        const crData = data as CorrelationResponsePayload;
        if (!crData.correlationId || crData.formData === undefined) {
          return NextResponse.json(
            {
              message:
                "Missing correlationId or formData for correlationResponse.",
            },
            { status: 400 }
          );
        }
        // Store correlation responses in a map, e.g., correlationResponses.ice-cream-drowning = { ... }
        updateData[`correlationResponses.${crData.correlationId}`] =
          crData.formData;
        break;
      case "crtData":
        updateData.crtResponses = data as CRTData;
        break;
      case "demographicsData":
        updateData.demographics = data as DemographicsData;
        break;
      default:
        return NextResponse.json(
          { message: "Invalid dataType." },
          { status: 400 }
        );
    }

    await participantRef.set(updateData, { merge: true });

    console.log(
      `Data type '${dataType}' for user '${userId}' successfully saved/merged to Firestore.`
    );
    return NextResponse.json(
      { message: `Data type '${dataType}' submitted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error processing progressive save for user:`, error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      errorMessage = String((error as { message: string }).message);
    }
    return NextResponse.json(
      { message: "Failed to submit data.", error: errorMessage },
      { status: 500 }
    );
  }
}
