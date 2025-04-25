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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
const router = express_1.default.Router();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DB_URL);
            console.log("connected");
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
app.use(express_1.default.json());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const signupschema = zod_1.z.object({
            username: zod_1.z.string().min(2).max(50),
            password: zod_1.z.string().min(2).max(50),
            firstname: zod_1.z.string().max(100).min(1),
            lastname: zod_1.z.string().max(100).min(1),
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
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        console.log(validsignup);
        if (validsignup.success) {
            try {
                yield db_1.usermodel.create({
                    username,
                    password: hashpassword,
                    firstname,
                    lastname,
                });
                res.json({ msg: "Signed Up" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "Error signing up" });
            }
        }
        else {
            res.json({ msg: "Wrong Input Credentials" });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const user = yield db_1.usermodel.findOne({
            username,
        });
        if (!user) {
            res.json({ msg: "Invalid username" });
        }
        else {
            const validpassword = yield bcrypt_1.default.compare(password, user.password);
            if (validpassword) {
                const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.jwt_key);
                res.json({ token: token });
            }
            else {
                res.json({ msg: "Incorrect password" });
            }
        }
    });
});
app.put("/api/v1/update", auth_1.userauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.id;
        const updatebody = zod_1.z.object({
            password: zod_1.z.string().max(50).min(2).optional(),
            firstname: zod_1.z.string().max(100).min(1).optional(),
            lastname: zod_1.z.string().max(100).min(1).optional(),
        });
        const validupdate = updatebody.safeParse(req.body);
        if (validupdate.success) {
            try {
                yield db_1.usermodel.updateOne({ _id: id }, req.body);
                res.json({ msg: "updated" });
            }
            catch (error) {
                res.json({ msg: "Update failed " });
                console.log(error);
            }
        }
        else {
            res.json({ msg: "wrong input format" });
        }
    });
});
app.listen(3000);
