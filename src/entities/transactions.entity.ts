import { Category } from './category.entity';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

type TransactionProps = {
  _id?: string;
  title: string;
  amount: number;
  date: Date;
  category: Category;
  type: TransactionType;
};

export class Transaction {
  public _id?: string;
  public title: string;
  public amount: number;
  public date: Date;
  public category: Category;
  public type: TransactionType;

  constructor(data: TransactionProps) {
    this._id = data._id;
    this.title = data.title;
    this.amount = data.amount;
    this.date = new Date(data.date);
    this.category = new Category(data.category);
    this.type = data.type;
  }
}
