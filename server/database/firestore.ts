import admin from "firebase-admin";
import env from "./env";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.PROJECT_ID,
      privateKey: env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: env.CLIENT_EMAIL,
    }),
  });
}

export default admin.firestore();
