import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { usermodel } from "./db";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userauth } from "./middleware/auth";
import { Request, Response } from "express";

const app = express();

const router = express.Router();

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

main();

app.use(express.json());

app.post("/api/v1/signup", async function (req: Request, res: Response) {
  const signupschema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    firstname: z.string().max(100).min(1),
    lastname: z.string().max(100).min(1),
  });

  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const validsignup = signupschema.safeParse({
    username,
    password,
    firstname,
    lastname,
  });

  const hashpassword = await bcrypt.hash(password, 10);

  console.log(validsignup);

  if (validsignup.success) {
    try {
      await usermodel.create({
        username,
        password: hashpassword,
        firstname,
        lastname,
      });
      res.json({ msg: "Signed Up" });
    } catch (error) {
      console.log(error);
      res.json({ msg: "Error signing up" });
    }
  } else {
    res.json({ msg: "Wrong Input Credentials" });
  }
});

app.post("/api/v1/signin", async function (req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await usermodel.findOne({
    username,
  });
  if (!user) {
    res.json({ msg: "Invalid username" });
  } else {
    const validpassword = await bcrypt.compare(password, user.password!);
    if (validpassword) {
      const token = jwt.sign({ id: user._id.toString() }, process.env.jwt_key!);
      res.json({ token: token });
    } else {
      res.json({ msg: "Incorrect password" });
    }
  }
});

app.put(
  "/api/v1/update",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const updatebody = z.object({
      password: z.string().max(50).min(2).optional(),
      firstname: z.string().max(100).min(1).optional(),
      lastname: z.string().max(100).min(1).optional(),
    });

    const validupdate = updatebody.safeParse(req.body);

    if (validupdate.success) {
      try {
        await usermodel.updateOne({ _id: id }, req.body);
        res.json({ msg: "updated" });
      } catch (error) {
        res.json({ msg: "Update failed " });
        console.log(error);
      }
    } else {
      res.json({ msg: "wrong input format" });
    }
  }
);

app.listen(3000);
