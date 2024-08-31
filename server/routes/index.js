import { Router } from "express";
import api from "./api/api.js";
import weatherModel from "../db/schema.js";
import path from 'path';
import { fileURLToPath } from 'url';

const router = new Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route for health check
router.get("/health", async (_req, res) => {
    try {
        await weatherModel.find().limit(1);
        res.status(200).send("Server is up and running.");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.use("/api", api);

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ status: err.status, message: err.message });
});

router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

export default router;
