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
exports.AddGoods = AddGoods;
exports.GetAllGoods = GetAllGoods;
exports.UpdateGoods = UpdateGoods;
exports.DeleteGoods = DeleteGoods;
const inventory_service_1 = require("./inventory.service");
function AddGoods(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, inventory_service_1.Add)(req);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
function GetAllGoods(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, inventory_service_1.GetAll)(req);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
// async function GetAGoods(req: Request, res: Response, next: NextFunction) {
//   try {
//     const result = await GetOne(req, res, next);
//     res.status(200).send(result);
//   } catch (error) {
//     next(error);
//   }
// }
function UpdateGoods(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, inventory_service_1.Update)(req);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    });
}
function DeleteGoods(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, inventory_service_1.Delete)(req);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    });
}
