"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor({ _id, title, color }) {
        this.title = title;
        this.color = color.toUpperCase();
        this.id = _id;
    }
}
exports.Category = Category;
