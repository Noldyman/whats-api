require("dotenv").config();
import express from "express";
import startRoutes from "./routes";

const app = express();
app.use(express.json());

startRoutes(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`App is listening on port ${port}`));
