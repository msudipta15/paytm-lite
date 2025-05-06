import { Router } from "express";
import { Request, Response } from "express";
import { guestModel } from "../db";
import { z } from "zod";
const guestRoute = Router();

guestRoute.post("/subscribe", async function (req: Request, res: Response) {
  const emailbody = z.object({
    email: z.string().email().max(100),
  });

  const email = req.body.email;

  const safeParse = emailbody.safeParse({ email });

  if (safeParse.error) {
    res.status(406).json({ msg: "Please enter a valid email" });
    return;
  }

  try {
    const user = await guestModel.findOne({
      email: email,
    });

    if (user) {
      res.status(406).json({ msg: "You are already Subscribed" });
      return;
    }

    await guestModel.create({
      email: email,
    });
    res.status(200).json({ msg: "Thank you for your Subscription !" });
  } catch (error) {
    res.status(402).json({ msg: "Something went wrong" });
    console.log(error);
  }
});

export { guestRoute };
