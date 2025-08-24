import admin from "firebase-admin";
import { readFile } from "fs/promises";
import path from "path";

const serviceAccount = JSON.parse(
  await readFile(new URL("../firebase-service-account.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
