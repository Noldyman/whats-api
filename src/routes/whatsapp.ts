import express from "express";
import { authenticate, sendMessages } from "../controllers/whatsapp";
import { validateMessages } from "../validation/validateMessage";

const router = express.Router();

router.get("/authenticate", authenticate);

router.post("/", validateMessages, sendMessages);

export default router;
