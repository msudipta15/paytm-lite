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
exports.userRoute = void 0;
require("dotenv/config");
const express_1 = require("express");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const lib_1 = require("../lib");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
userRoute.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const signupschema = zod_1.z.object({
            email: zod_1.z.string().max(100).email(),
            password: zod_1.z.string().min(2).max(50),
            firstname: zod_1.z.string().max(100).min(1),
            lastname: zod_1.z.string().max(100).min(1),
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
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        if (validsignup.success) {
            const existinguser = yield db_1.usermodel.findOne({ email: email });
            if (existinguser) {
                res.status(409).json({ msg: "Email already exists , Please Sign in" });
                return;
            }
            try {
                const user = yield db_1.usermodel.create({
                    email: email,
                    password: hashpassword,
                    firstname,
                    lastname,
                });
                const userid = user._id;
                yield db_1.accountmodel.create({
                    userid: userid,
                    balance: (0, lib_1.generateBalance)(),
                });
                res.json({ msg: "Signed Up" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ msg: "Error signing up" });
            }
        }
        else {
            res.status(422).json({ msg: "Wrong Input Credentials" });
        }
    });
});
userRoute.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield db_1.usermodel.findOne({
            email: email,
        });
        if (!user) {
            res.status(402).json({ msg: "No account found with this email !" });
        }
        else {
            const validpassword = yield bcrypt_1.default.compare(password, user.password);
            if (validpassword) {
                const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.jwt_key);
                res.status(200).json({ token: token });
            }
            else {
                res.status(402).json({ msg: "Incorrect password" });
            }
        }
    });
});
userRoute.get("/user", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        try {
            const user = yield db_1.usermodel.findOne({ _id: id });
            if (user) {
                res.json({ user });
            }
            else {
                res.json({ msg: "user not found" });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
userRoute.put("/update", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        const updatebody = zod_1.z.object({
            password: zod_1.z.string().max(50).min(2).optional(),
            firstname: zod_1.z.string().max(100).min(1).optional(),
            lastname: zod_1.z.string().max(100).min(1).optional(),
        });
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const validupdate = updatebody.safeParse({ password, firstname, lastname });
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        if (validupdate.success) {
            try {
                yield db_1.usermodel.updateOne({ _id: id }, { firstname, lastname, password: hashpassword });
                res.status(200).json({ msg: "Succesfully Updated !" });
            }
            catch (error) {
                res.status(402).json({ msg: "Update failed" });
                console.log(error);
            }
        }
        else {
            res.status(411).json({ msg: "Wrong input format !" });
        }
    });
});
userRoute.post("/addreciever", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        const email = req.body.email;
        try {
            const reciever = yield db_1.usermodel.findOne({ email: email });
            if (!reciever) {
                res.status(402).json({ msg: "No user found" });
                return;
            }
            const reciever_id = reciever === null || reciever === void 0 ? void 0 : reciever._id;
            const recieverfirstname = reciever === null || reciever === void 0 ? void 0 : reciever.firstname;
            const recieverlastname = reciever === null || reciever === void 0 ? void 0 : reciever.lastname;
            const existing = yield db_1.recievermodel.findOne({
                userid: id,
                recieverid: reciever_id,
            });
            if (existing) {
                res.status(411).json({ msg: "Reciever already added" });
                return;
            }
            yield db_1.recievermodel.create({
                userid: id,
                recieverid: reciever_id,
            });
            res.status(200).json({ msg: "Reciever added" });
        }
        catch (error) {
            res.status(401).json({ msg: "Something went wrong" });
            console.log(error);
        }
    });
});
userRoute.put("/deletereciever", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        const email = req.body.email;
        try {
            const reciever = yield db_1.usermodel.findOne({ email: email });
            const reciever_id = reciever === null || reciever === void 0 ? void 0 : reciever._id;
            if (reciever) {
                yield db_1.recievermodel.deleteOne({ userid: id, recieverid: reciever_id });
                res.status(200).json({ msg: "Reciever Deleted" });
            }
            else {
                res.status(401).json({ msg: "Invalid username" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(402).json({ msg: "something went wrong !" });
        }
    });
});
userRoute.get("/reciever", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        try {
            const reciever = yield db_1.recievermodel
                .find({ userid: id })
                .populate({ path: "recieverid", select: "email firstname lastname" });
            if (reciever.length != 0) {
                res.status(200).json({ reciever });
            }
            else {
                res.status(402).json({ msg: "No reciever Added" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(402).json({ msg: "something went wrong !" });
        }
    });
});
