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
exports.TransactionsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const balance_entity_1 = require("../entities/balance.entity");
const transactions_entity_1 = require("../entities/transactions.entity");
const app_error_1 = require("../errors/app.error");
class TransactionsService {
    constructor(transactionsRepository, categoriesRepository) {
        this.transactionsRepository = transactionsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, type, date, categoryId, amount, }) {
            const category = yield this.categoriesRepository.findById(categoryId);
            if (!category) {
                throw new app_error_1.AppError('Category does not exists.', http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const transaction = new transactions_entity_1.Transaction({
                title,
                type,
                date,
                category,
                amount,
            });
            const createdTransaction = yield this.transactionsRepository.create(transaction);
            return createdTransaction;
        });
    }
    index(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.transactionsRepository.index(filters);
            return transactions;
        });
    }
    getDashboard(_a) {
        return __awaiter(this, arguments, void 0, function* ({ beginDate, endDate, }) {
            let [balance, expenses] = yield Promise.all([
                this.transactionsRepository.getBalance({
                    beginDate,
                    endDate,
                }),
                this.transactionsRepository.getExpenses({
                    beginDate,
                    endDate,
                }),
            ]);
            if (!balance) {
                balance = new balance_entity_1.Balance({
                    _id: null,
                    incomes: 0,
                    expenses: 0,
                    balance: 0,
                });
            }
            return { balance, expenses };
        });
    }
    getFinancialEvolution(_a) {
        return __awaiter(this, arguments, void 0, function* ({ year, }) {
            const financialEvolution = yield this.transactionsRepository.getFinancialEvolution({ year });
            return financialEvolution;
        });
    }
}
exports.TransactionsService = TransactionsService;
