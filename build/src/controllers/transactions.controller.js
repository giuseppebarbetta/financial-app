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
exports.TransactionsController = void 0;
const http_status_codes_1 = require("http-status-codes");
class TransactionsController {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, amount, categoryId, date, type } = req.body;
                const newTransaction = yield this.transactionService.create({
                    title,
                    amount,
                    categoryId,
                    date,
                    type,
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(newTransaction);
            }
            catch (err) {
                next(err);
            }
        });
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, categoryId, beginDate, endDate } = req.query;
                const newTransaction = yield this.transactionService.index({
                    title,
                    categoryId,
                    beginDate,
                    endDate,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(newTransaction);
            }
            catch (err) {
                next(err);
            }
        });
        this.getDashboard = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { beginDate, endDate } = req.query;
                const newTransaction = yield this.transactionService.getDashboard({
                    beginDate,
                    endDate,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(newTransaction);
            }
            catch (err) {
                next(err);
            }
        });
        this.getFinancialEvolution = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { year } = req.query;
                const newTransaction = yield this.transactionService.getFinancialEvolution({
                    year,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(newTransaction);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.TransactionsController = TransactionsController;
