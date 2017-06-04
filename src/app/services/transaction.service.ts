import { Injectable } from '@angular/core';
import { TransactionHistoryService } from 'app/services/transaction-history.service';
import { Transaction } from 'app/models/transaction';
import { LicenseValidationHandler, DiscountHandler, TruckHandler, BasePriceHandler } from 'app/models/transaction-handlers';

@Injectable()
export class TransactionService {

  constructor(private _transactionHistory: TransactionHistoryService) { }

  processTransaction(transaction: Transaction) {

    const transHistory = new TransactionHistoryService();
    const licenseHandler = new LicenseValidationHandler();
    const discountHandler = new DiscountHandler(transHistory, licenseHandler);
    const truckHandler = new TruckHandler(discountHandler);
    const baseHandler = new BasePriceHandler(truckHandler);

    baseHandler.handle(transaction);
  }

  saveTransaction(transaction: Transaction) {
    this._transactionHistory.addTransaction(transaction);
  }
}
