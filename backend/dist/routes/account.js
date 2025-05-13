"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const db_1 = require("../db");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = __importDefault(require("mongoose"));
const accountRouter = (0, express_1.Router)();
exports.accountRouter = accountRouter;
accountRouter.get("/balance", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = req.id;
        try {
            const account = yield db_1.accountmodel.findOne({
                userid: userid,
            });
            const balance = account === null || account === void 0 ? void 0 : account.balance;
            res.status(200).json({ balance: balance });
        }
        catch (error) {
            res.status(402).json({ msg: "Something went wrong !" });
            console.log(error);
        }
    });
});
accountRouter.post("/transfer", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = req.id;
        const email = req.body.email;
        const amount = parseInt(req.body.amount);
        const account = yield db_1.accountmodel.findOne({ userid: userid });
        const user_balance = account === null || account === void 0 ? void 0 : account.balance;
        const reciever = yield db_1.usermodel.findOne({ email: email }).select("_id");
        if (user_balance < amount) {
            res.status(402).json({ msg: "Insufficiant Balance" });
            return;
        }
        if (!reciever) {
            res.status(402).json({ msg: "No User found" });
            return;
        }
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const reciever_account = yield db_1.accountmodel.findOne({
                userid: reciever,
            });
            const reciever_balance = reciever_account === null || reciever_account === void 0 ? void 0 : reciever_account.balance;
            const reciever_updated_balance = reciever_balance + amount;
            const user_updated_balance = user_balance - amount;
            console.log(user_balance);
            console.log(user_updated_balance);
            console.log(reciever_balance);
            console.log(reciever_updated_balance);
            yield db_1.accountmodel.updateOne({ userid: userid }, { balance: user_updated_balance }, { session });
            yield db_1.accountmodel.updateOne({ userid: reciever }, { balance: reciever_updated_balance }, { session });
            yield db_1.transactionModel.create({
                sender: userid,
                reciever: reciever,
                amount: amount,
                time: Date.now(),
            });
            yield session.commitTransaction();
            res.json({ msg: "Transaction Succesfull" });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Something went wrong" });
        }
        finally {
            session.endSession();
        }
    });
});
accountRouter.get("/transactions", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = req.id;
        try {
            const transactions = yield db_1.transactionModel
                .find({
                $or: [{ sender: userid }, { reciever: userid }],
            })
                .sort({ time: -1 })
                .populate({ path: "sender reciever", select: "firstname lastname" });
            const history = transactions.map((t) => {
                return {
                    user: 
                    //@ts-ignore
                    t.sender._id.toString() === (userid === null || userid === void 0 ? void 0 : userid.toString())
                        ? //@ts-ignore
                            t.reciever.firstname + " " + t.reciever.lastname
                        : //@ts-ignore
                            t.sender.firstname + " " + t.sender.lastname,
                    type: 
                    //@ts-ignore
                    t.sender._id.toString() === (userid === null || userid === void 0 ? void 0 : userid.toString()) ? "Debit" : "Credit",
                    amount: t.amount,
                    time: (0, moment_timezone_1.default)(t.time).tz("Asia/Kolkata").format("DD/MM/YYYY  hh:mm"),
                };
            });
            res.status(200).json({ history: history });
        }
        catch (error) {
            console.log(error);
            res.status(406).json({ msg: "something went wrong !" });
        }
    });
});
