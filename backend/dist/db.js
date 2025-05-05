"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.recievermodel = exports.accountmodel = exports.usermodel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: { required: true, type: String, unique: true, max: 50 },
    password: { required: true, type: String, max: 50 },
    firstname: { required: true, type: String, max: 100 },
    lastname: { required: true, type: String, max: 100 },
});
const accountSchema = new mongoose_1.Schema({
    userid: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "user" },
    balance: { type: Number, required: true },
});
const recieverSchema = new mongoose_1.Schema({
    userid: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "user" },
    recieverid: { type: mongoose_1.default.Types.ObjectId },
    recieveremail: { type: String },
    recieverfirstname: { type: String },
    recieverlastname: { type: String },
});
exports.usermodel = mongoose_1.default.model("user", userSchema);
exports.accountmodel = mongoose_1.default.model("account", accountSchema);
exports.recievermodel = mongoose_1.default.model("reciever", recieverSchema);
