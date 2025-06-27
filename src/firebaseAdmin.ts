import admin from "firebase-admin";

export const adminFirebase = admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});