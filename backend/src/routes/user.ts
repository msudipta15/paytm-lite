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

  if (validsignup.success) {
    const existinguser = await usermodel.findOne({ username: username });

    if (existinguser) {
      res.json({ msg: "username already exists" });
      return;
    }

    try {
      const user = await usermodel.create({
        username,
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
      res.json({ msg: "Error signing up" });
    }
  } else {
    res.json({ msg: "Wrong Input Credentials" });
  }
});

userRoute.post("/signin", async function (req: Request, res: Response) {
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

userRoute.post(
  "/addreciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const username = req.body.username;

    try {
      const reciever = await usermodel.findOne({ username: username });
      const reciever_id = reciever?._id;
      const recieverfirstname = reciever?.firstname;
      const recieverlastname = reciever?.lastname;
      const existing = await recievermodel.findOne({
        userid: id,
        recieverid: reciever_id,
      });
      if (existing) {
        res.json({ msg: "reciever already exists" });
        return;
      }
      await recievermodel.create({
        userid: id,
        recieverid: reciever_id,
        recieverusername: username,
        recieverfirstname: recieverfirstname,
        recieverlastname: recieverlastname,
      });
      res.json({ msg: "Reciever added" });
    } catch (error) {
      res.json({ msg: "Something went wrong" });
      console.log(error);
    }
  }
);

userRoute.put(
  "/deletereciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;
    const username = req.body.username;
    try {
      const reciever = await usermodel.findOne({ username: username });
      const reciever_id = reciever?._id;
      if (reciever) {
        await recievermodel.deleteOne({ userid: id, recieverid: reciever_id });
        res.json({ msg: "Reciever deleted" });
      } else {
        res.json({ msg: "Invalid username" });
      }
    } catch (error) {
      console.log(error);
      res.json({ msg: "something went wrong" });
    }
  }
);

userRoute.get(
  "/reciever",
  userauth,
  async function (req: Request, res: Response) {
    const id = req.id;

    try {
      const reciever = await recievermodel.find({ userid: id });
      if (reciever.length != 0) {
        res.json({ reciever });
      } else {
        res.json({ msg: "No reciever found" });
      }
    } catch (error) {
      console.log(error);
      res.json({ msg: "something went wrong" });
    }
  }
);

export { userRoute };
