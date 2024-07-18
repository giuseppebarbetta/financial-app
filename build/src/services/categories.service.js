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
exports.CategoriesService = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_entity_1 = require("../entities/category.entity");
const app_error_1 = require("../errors/app.error");
class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, color }) {
            const foundCategory = yield this.categoriesRepository.findByTitle(title);
            if (foundCategory) {
                throw new app_error_1.AppError('Category already exists.', http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            const category = new category_entity_1.Category({
                title,
                color,
            });
            const createdCategory = yield this.categoriesRepository.create(category);
            return createdCategory;
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoriesRepository.index();
            return categories;
        });
    }
}
exports.CategoriesService = CategoriesService;
