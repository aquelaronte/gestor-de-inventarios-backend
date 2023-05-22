import express, { Express } from "express";
import cors from "cors";
import mongoConnect from "./config/dbConnect";
import dotenv from "dotenv";
import router from "./routes";
dotenv.config();

const app: Express = express();
const port: Number = 3000;
const URI: string | undefined = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoConnect(URI as string);
app.listen(port, (): void => {
  console.log("Server is listening on port " + port);
});
