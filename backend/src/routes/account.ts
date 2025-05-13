import { Router } from "express";
import { userauth } from "../middleware/auth";
import { Request, Response } from "express";
import { accountmodel, transactionModel, usermodel } from "../db";
import moment from "moment-timezone";
import mongoose from "mongoose";
import { date } from "zod";

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

      await transactionModel.create({
        sender: userid,
        reciever: reciever,
        amount: amount,
        time: Date.now(),
      });

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

accountRouter.get(
  "/transactions",
  userauth,
  async function (req: Request, res: Response) {
    const userid = req.id;

    try {
      const transactions = await transactionModel
        .find({
          $or: [{ sender: userid }, { reciever: userid }],
        })
        .sort({ time: -1 })
        .populate({ path: "sender reciever", select: "firstname lastname" });

      const history = transactions.map((t) => {
        return {
          user:
            //@ts-ignore
            t.sender._id.toString() === userid?.toString()
              ? //@ts-ignore
                t.reciever.firstname + " " + t.reciever.lastname
              : //@ts-ignore
                t.sender.firstname + " " + t.sender.lastname,

          type:
            //@ts-ignore
            t.sender._id.toString() === userid?.toString() ? "Debit" : "Credit",
          amount: t.amount,
          time: moment(t.time).tz("Asia/Kolkata").format("DD/MM/YYYY  hh:mm"),
        };
      });

      res.status(200).json({ history: history });
    } catch (error) {
      console.log(error);
      res.status(406).json({ msg: "something went wrong !" });
    }
  }
);

export { accountRouter };
