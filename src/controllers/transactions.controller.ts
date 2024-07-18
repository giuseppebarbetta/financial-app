import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto';
import { TransactionsService } from '../services/transactions.service';
import { BodyRequest, QueryRequest } from './types';

export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
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
    req: QueryRequest<IndexTransactionsDTO>,
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

  getDashboard = async (
    req: QueryRequest<GetDashboardDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { beginDate, endDate } = req.query;

      const newTransaction = await this.transactionService.getDashboard({
        beginDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(newTransaction);
    } catch (err) {
      next(err);
    }
  };

  getFinancialEvolution = async (
    req: QueryRequest<GetFinancialEvolutionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.query;

      const newTransaction =
        await this.transactionService.getFinancialEvolution({
          year,
        });

      return res.status(StatusCodes.OK).json(newTransaction);
    } catch (err) {
      next(err);
    }
  };
}
