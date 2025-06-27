import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { routes } from "./routes";

const app = express();

// app.use(cors);  
// app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Servidor rodando na porta http://localhost:3000"))