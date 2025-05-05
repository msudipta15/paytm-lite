import { Router } from "express";
import { userauth } from "../middleware/auth";
import { Request, Response } from "express";
import { accountmodel, usermodel } from "../db";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get(
  "/balance",
  userauth,
  async function (req: Request, res: Response) {
    const userid = req.id;
    try {
      const account = await accountmodel.findOne({
        userid: userid,
      });
      const balance = account?.balance;
      res.status(200).json({ balance: balance });
    } catch (error) {
      res.status(402).json({ msg: "Something went wrong !" });
      console.log(error);
    }
  }
);

accountRouter.post(
  "/transfer",
  userauth,
  async function (req: Request, res: Response) {
    const userid = req.id;
    const email = req.body.email;
    const amount = parseInt(req.body.amount);

    const account = await accountmodel.findOne({ userid: userid });
    const user_balance = account?.balance;

    const reciever = await usermodel.findOne({ email: email }).select("_id");

    if (user_balance! < amount) {
      res.status(402).json({ msg: "Insufficiant Balance" });
      return;
    }

    if (!reciever) {
      res.status(402).json({ msg: "No User found" });
      return;
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const reciever_account = await accountmodel.findOne({
        userid: reciever,
      });
      const reciever_balance = reciever_account?.balance;
      const reciever_updated_balance = reciever_balance! + amount;
      const user_updated_balance = user_balance! - amount;
      console.log(user_balance);
      console.log(user_updated_balance);
      console.log(reciever_balance);
      console.log(reciever_updated_balance);

      await accountmodel.updateOne(
        { userid: userid },
        { balance: user_updated_balance },
        { session }
      );

      await accountmodel.updateOne(
        { userid: reciever },
        { balance: reciever_updated_balance },
        { session }
      );

      await session.commitTransaction();

      res.json({ msg: "Transaction Succesfull" });
    } catch (error) {
      console.log(error);
      res.json({ msg: "Something went wrong" });
    } finally {
      session.endSession();
    }
  }
);

export { accountRouter };
