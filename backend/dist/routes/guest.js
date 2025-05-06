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
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const guestRoute = (0, express_1.Router)();
exports.guestRoute = guestRoute;
guestRoute.post("/subscribe", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        try {
            const user = yield db_1.guestModel.findOne({
                email: email,
            });
            if (user) {
                res.status(406).json({ msg: "You are already Subscribed" });
                return;
            }
            yield db_1.guestModel.create({
                email: email,
            });
            res.status(200).json({ msg: "Thank you for your Subscription !" });
        }
        catch (error) {
            res.status(402).json({ msg: "Something went wrong" });
            console.log(error);
        }
    });
});
