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
exports.TransactionsRepository = void 0;
const transactions_entity_1 = require("../../entities/transactions.entity");
class TransactionsRepository {
    constructor(model) {
        this.model = model;
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, date, amount, type, category, }) {
            const createdTransaction = yield this.model.create({
                title,
                date,
                amount,
                type,
                category,
            });
            return createdTransaction.toObject();
        });
    }
    index(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, categoryId, beginDate, endDate, }) {
            const whereParams = Object.assign(Object.assign({}, (title && { title: { $regex: title, $options: 'i' } })), (categoryId && { 'category._id': categoryId }));
            if (beginDate || endDate) {
                whereParams.date = Object.assign(Object.assign({}, (beginDate && { $gte: beginDate })), (endDate && { $lte: endDate }));
            }
            const transactions = yield this.model.find(whereParams, undefined, {
                sort: {
                    date: -1,
                },
            });
            const transactionsMap = transactions.map((item) => item.toObject());
            return transactionsMap;
        });
    }
    getBalance(_a) {
        return __awaiter(this, arguments, void 0, function* ({ beginDate, endDate }) {
            const aggregate = this.model.aggregate();
            if (beginDate || endDate) {
                aggregate.match({
                    date: Object.assign(Object.assign({}, (beginDate && { $gte: beginDate })), (endDate && { $lte: endDate })),
                });
            }
            const [result] = yield aggregate
                .project({
                _id: 0,
                income: {
                    $cond: [
                        {
                            $eq: ['$type', 'income'],
                        },
                        '$amount',
                        0,
                    ],
                },
                expense: {
                    $cond: [
                        {
                            $eq: ['$type', 'expense'],
                        },
                        '$amount',
                        0,
                    ],
                },
            })
                .group({
                _id: null,
                incomes: {
                    $sum: '$income',
                },
                expenses: {
                    $sum: '$expense',
                },
            })
                .addFields({
                balance: {
                    $subtract: ['$incomes', '$expenses'],
                },
            });
            return result;
        });
    }
    getExpenses(_a) {
        return __awaiter(this, arguments, void 0, function* ({ beginDate, endDate, }) {
            const aggregate = this.model.aggregate();
            const matchParams = {
                type: transactions_entity_1.TransactionType.EXPENSE,
            };
            if (beginDate || endDate) {
                matchParams.date = Object.assign(Object.assign({}, (beginDate && { $gte: beginDate })), (endDate && { $lte: endDate }));
            }
            const result = yield aggregate.match(matchParams).group({
                _id: '$category._id',
                title: {
                    $first: '$category.title',
                },
                color: {
                    $first: '$category.color',
                },
                amount: {
                    $sum: '$amount',
                },
            });
            return result;
        });
    }
    getFinancialEvolution(_a) {
        return __awaiter(this, arguments, void 0, function* ({ year, }) {
            const aggregate = this.model.aggregate();
            const result = yield aggregate
                .match({
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            })
                .project({
                _id: 0,
                income: {
                    $cond: [
                        {
                            $eq: ['$type', 'income'],
                        },
                        '$amount',
                        0,
                    ],
                },
                expense: {
                    $cond: [
                        {
                            $eq: ['$type', 'expense'],
                        },
                        '$amount',
                        0,
                    ],
                },
                year: {
                    $year: '$date',
                },
                month: {
                    $month: '$date',
                },
            })
                .group({
                _id: ['$year', '$month'],
                incomes: {
                    $sum: '$income',
                },
                expenses: {
                    $sum: '$expense',
                },
            })
                .addFields({
                balance: {
                    $subtract: ['$incomes', '$expenses'],
                },
            })
                .sort({
                _id: 1,
            });
            return result;
        });
    }
}
exports.TransactionsRepository = TransactionsRepository;
