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
exports.userauth = userauth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function userauth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const valid = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.toString(), process.env.jwt_key);
        if (valid) {
            const id = valid.id;
            req.id = id;
            next();
        }
        else {
            res.json({ msg: "You are not signed in" });
        }
    });
}
