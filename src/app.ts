require("dotenv").config();
import express from "express";
import cors from "cors";
import startRoutes from "./routes";
import { corsOptions } from "./config/cors";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

startRoutes(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`App is listening on port ${port}`));
