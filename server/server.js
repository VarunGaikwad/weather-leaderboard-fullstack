import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import path from "path";
import { configDotenv } from "dotenv";

configDotenv();

const app = express(),
    { MONGODB_USERNAME, MONGODB_PASSWORD, PORT } = process.env;

function mongooseSuccessHandler() {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
    app.use(express.json());
    app.use(router);
    app.use((_req, res) => {
        res.status(404).sendFile(path.join(process.cwd(), "pages", "notFound.html"));
    });
    app.listen(PORT || 4004);
}

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@leaderboard-cluster.5m9zw.mongodb.net/leaderboard?retryWrites=true&w=majority&appName=leaderboard-cluster`).then(mongooseSuccessHandler).catch(console.error);