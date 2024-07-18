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
exports.CategoriesController = void 0;
const http_status_codes_1 = require("http-status-codes");
class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, color } = req.body;
                const newCategory = yield this.categoriesService.create({ title, color });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(newCategory);
            }
            catch (err) {
                next(err);
            }
        });
        this.index = (_, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield this.categoriesService.index();
                return res.status(http_status_codes_1.StatusCodes.OK).json(newCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CategoriesController = CategoriesController;
