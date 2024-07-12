import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateTransactionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto';
import { TransactionsService } from '../services/transactions.service';

export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, amount, categoryId, date, type } = req.body;

      const newTransaction = await this.transactionService.create({
        title,
        amount,
        categoryId,
        date,
        type,
      });

      return res.status(StatusCodes.CREATED).json(newTransaction);
    } catch (err) {
      next(err);
    }
  };

  index = async (
    req: Request<unknown, unknown, unknown, IndexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query;
      const newTransaction = await this.transactionService.index({
        title,
        categoryId,
        beginDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(newTransaction);
    } catch (err) {
      next(err);
    }
  };
}