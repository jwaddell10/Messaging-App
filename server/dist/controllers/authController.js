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
exports.logInPost = exports.signUpPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const asyncHandler = express_async_handler_1.default;
const queries_1 = __importDefault(require("../db/queries"));
exports.signUpPost = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield queries_1.default.findUser(req.body.name);
    console.log(user, 'user');
    // if (user !== null)
}));
exports.logInPost = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res, 'this is res', req, 'this is req in login');
    console.log(req.body, 'login post req body');
}));
