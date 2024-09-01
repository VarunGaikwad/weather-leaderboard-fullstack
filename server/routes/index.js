import { Router } from "express";
import api from "./api/api.js";
import weatherModel from "../db/schema.js";
import "../job/schedule.js";

const router = new Router();

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


export default router;
