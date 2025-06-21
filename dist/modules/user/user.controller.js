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
exports.TestController = TestController;
exports.GetAllUser = GetAllUser;
exports.RegisterUser = RegisterUser;
exports.LoginUser = LoginUser;
const user_service_1 = require("./user.service");
function TestController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.TestService)();
            res.status(200).send(result);
        }
        catch (error) {
            // console.log(error);
            next(error);
        }
    });
}
function GetAllUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.GetAllUserData)();
            res.status(200).send(result);
        }
        catch (error) {
            // console.log(error);
            next(error);
        }
    });
}
function RegisterUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.Register)(req);
            res.status(201).send(result);
        }
        catch (error) {
            // console.log(error);
            next(error);
        }
    });
}
function LoginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.Login)(req);
            res.status(200).send(result);
        }
        catch (error) {
            // console.log(error);
            next(error);
        }
    });
}
