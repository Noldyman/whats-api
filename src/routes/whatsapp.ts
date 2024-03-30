import express from "express";
import { sendMessages } from "../controllers/whatsapp";
import { validateMessages } from "../validation/validateMessage";

const router = express.Router();

router.post("/", validateMessages, sendMessages);

export default router;
