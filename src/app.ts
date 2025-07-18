import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());  
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log("Servidor rodando na porta http://localhost:3001"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({error: err.message});
    }

    return res.status(500).json({status: "Internet Server Error"});
})

