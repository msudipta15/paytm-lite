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
      res.json({ balance: balance });
    } catch (error) {
      res.json({ msg: "Something went wrong !" });
      console.log(error);
    }
  }
);

accountRouter.post(
  "/transfer",
  userauth,
  async function (req: Request, res: Response) {
    const userid = req.id;
    const username = req.body.username;
    const amount = req.body.amount;

    const account = await accountmodel.findOne({ userid: userid });
    const user_balance = account?.balance;

    const reciever = await usermodel
      .findOne({ username: username })
      .select("_id");

    if (reciever) {
      if (user_balance! < amount) {
        res.json({ msg: "Insufficiant Balance" });
        return;
      }
      const reciever_account = await accountmodel.findOne({ userid: reciever });
      const reciever_balance = reciever_account?.balance;
      const reciever_updated_balance = reciever_balance + amount;
      const user_updated_balance = user_balance! - amount;
      console.log(user_updated_balance);

      const session = await mongoose.startSession();

      try {
        session.startTransaction();

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
    } else {
      res.json({ msg: "user not found" });
    }
  }
);

export { accountRouter };
