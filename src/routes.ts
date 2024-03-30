import { Express } from "express";
import whatsapp from "./routes/whatsapp";

export default (app: Express) => {
  app.use("/api/whatsapp", whatsapp);
};
