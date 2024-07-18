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
exports.CategoriesRepository = void 0;
class CategoriesRepository {
    constructor(model) {
        this.model = model;
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, color }) {
            const createdCategory = yield this.model.create({ title, color });
            return createdCategory.toObject();
        });
    }
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.model.findOne({ title });
            return category === null || category === void 0 ? void 0 : category.toObject();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.model.findById(id);
            return category === null || category === void 0 ? void 0 : category.toObject();
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.model.find();
            const categoriesMap = categories.map((item) => item.toObject());
            return categoriesMap;
        });
    }
}
exports.CategoriesRepository = CategoriesRepository;
