import "dotenv/config";
import { Router } from "express";
import { accountmodel, recievermodel, usermodel } from "../db";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userauth } from "../middleware/auth";
import { Request, Response } from "express";
import { generateBalance } from "../lib";

const userRoute = Router();

userRoute.post("/signup", async function (req: Request, res: Response) {
  const signupschema = z.object({
    email: z.string().max(100).email(),
    password: z.string().min(2).max(50),
    firstname: z.string().max(100).min(1),
    lastname: z.string().max(100).min(1),
  });

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const validsignup = signupschema.safeParse({
    email,
    password,
    firstname,
    lastname,
  });

  const hashpassword = await bcrypt.hash(password, 10);

  if (validsignup.success) {
    const existinguser = await usermodel.findOne({ email: email });

    if (existinguser) {
      res.status(409).json({ msg: "Email already exists , Please Sign in" });
      return;
    }

    try {
      const user = await usermodel.create({
        email: email,
        password: hashpassword,
        firstname,
        lastname,
      });

      const userid = user._id;

      await accountmodel.create({
        userid: userid,
        balance: generateBalance(),
      });

      res.json({ msg: "Signed Up" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Error signing up" });
    }
  } else {
    res.status(422).json({ msg: "Wrong Input Credentials" });
  }
});

userRoute.post("/signin", async function (req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await usermodel.findOne({
    email: email,
  });
  if (!user) {
    res.status(402).json({ msg: "No account found with this email !" });
  } else {
    const validpassword = await bcrypt.compare(password, user.password!);
    if (validpassword) {
      const token = jwt.sign({ id: user._id.toString() }, process.env.jwt_key!);
      res.status(200).json({ token: token });
    } else {
      res.status(402).json({ msg: "Incorrect password" });
    }
  }
});

userRoute.get("/user", userauth, async function (req: Request, res: Response) {
  const id = req.id;
  try {
    const user = await usermodel.findOne({ _id: id });
    if (user) {
      res.json({ user });
    } else {
      res.json({ msg: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

userRoute.put(
  "/update",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const updatebody = z.object({
      password: z.string().max(50).min(2).optional(),
      firstname: z.string().max(100).min(1).optional(),
      lastname: z.string().max(100).min(1).optional(),
    });

    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const validupdate = updatebody.safeParse({ password, firstname, lastname });

    const hashpassword = await bcrypt.hash(password, 10);

    if (validupdate.success) {
      try {
        await usermodel.updateOne(
          { _id: id },
          { firstname, lastname, password: hashpassword }
        );
        res.status(200).json({ msg: "Succesfully Updated !" });
      } catch (error) {
        res.status(402).json({ msg: "Update failed" });
        console.log(error);
      }
    } else {
      res.status(411).json({ msg: "Wrong input format !" });
    }
  }
);

userRoute.post(
  "/addreciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const email = req.body.email;

    try {
      const reciever = await usermodel.findOne({ email: email });
      if (!reciever) {
        res.status(402).json({ msg: "No user found" });
        return;
      }
      const reciever_id = reciever?._id;
      const recieverfirstname = reciever?.firstname;
      const recieverlastname = reciever?.lastname;
      const existing = await recievermodel.findOne({
        userid: id,
        recieverid: reciever_id,
      });
      if (existing) {
        res.status(411).json({ msg: "Reciever already added" });
        return;
      }
      await recievermodel.create({
        userid: id,
        recieverid: reciever_id,
      });
      res.status(200).json({ msg: "Reciever added" });
    } catch (error) {
      res.status(401).json({ msg: "Something went wrong" });
      console.log(error);
    }
  }
);

userRoute.put(
  "/deletereciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const email = req.body.email;
    try {
      const reciever = await usermodel.findOne({ email: email });
      const reciever_id = reciever?._id;
      if (reciever) {
        await recievermodel.deleteOne({ userid: id, recieverid: reciever_id });
        res.status(200).json({ msg: "Reciever Deleted" });
      } else {
        res.status(401).json({ msg: "Invalid username" });
      }
    } catch (error) {
      console.log(error);
      res.status(402).json({ msg: "something went wrong !" });
    }
  }
);

userRoute.get(
  "/reciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;

    try {
      const reciever = await recievermodel
        .find({ userid: id })
        .populate({ path: "recieverid", select: "email firstname lastname" });
      if (reciever.length != 0) {
        res.status(200).json({ reciever });
      } else {
        res.status(402).json({ msg: "No reciever Added" });
      }
    } catch (error) {
      console.log(error);
      res.status(402).json({ msg: "something went wrong !" });
    }
  }
);

export { userRoute };
