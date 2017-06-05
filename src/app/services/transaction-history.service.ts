import { Injectable } from '@angular/core';
import { Transaction } from 'app/models/transaction';

@Injectable()
export class TransactionHistoryService {

  private static Transactions: Transaction[] = [];

  getTransactions(): Transaction[] {
    return TransactionHistoryService.Transactions;
  }

  clearTransactions(): Transaction[] {
    return TransactionHistoryService.Transactions = [];
  }

  addTransaction(transaction: Transaction) {
    TransactionHistoryService.Transactions.push(transaction);
  };
}
