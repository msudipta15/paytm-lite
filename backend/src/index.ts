import "dotenv/config";
import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRoute } from "./routes/user";
import { accountRouter } from "./routes/account";

const app = express();

/* // To allow a specific origin in corse do the below

const corseoptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corseoptions))
*/

app.use(cors()); // This will alow any origin

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

main();

app.use(Router());

app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1/account", accountRouter);

app.listen(3000);
