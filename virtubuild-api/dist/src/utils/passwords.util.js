"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const encryptPassword = async (rawPassword) => {
    const encrypted = await argon2_1.default.hash(rawPassword);
    return encrypted;
};
exports.encryptPassword = encryptPassword;
const verifyPassword = async (rawPassword, encryptedPassword) => {
    const isMatched = await argon2_1.default.verify(encryptedPassword, rawPassword);
    return isMatched;
};
exports.verifyPassword = verifyPassword;
