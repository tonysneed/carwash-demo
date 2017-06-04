import { Transaction } from 'app/models/transaction';
import { Car, Truck, TruckBed } from 'app/models/vehicle';
import { TransactionHistoryService } from 'app/services/transaction-history.service';

export abstract class TransactionHandler {
  constructor(private _successor?: TransactionHandler) {
  }

  handle(transaction: Transaction): void {
    if (this._successor) {
      this._successor.handle(transaction);
    }
  }
}

export class BasePriceHandler extends TransactionHandler {

  handle(transaction: Transaction): void {
    if (transaction.vehicle instanceof Car) {
      transaction.price = 5;
    } else {
      if (transaction.vehicle instanceof Truck) {
        transaction.price = 10;
      } else {
        throw new Error('Invalid vehicle type');
      }
    }

    super.handle(transaction);
  }
}

export class TruckHandler extends TransactionHandler {

  handle(transaction: Transaction): void {
    if (transaction.vehicle instanceof Truck) {
      if (transaction.vehicle.truckBed.isDown) {
        throw new Error('Truck bed let down');
      }
      if (transaction.vehicle.truckBed.isMuddy === true) {
        transaction.price += 2;
      }
    }

    super.handle(transaction);
  }
}

export class DiscountHandler extends TransactionHandler {

  constructor(private _transactionHistory: TransactionHistoryService, successor?: TransactionHandler) {
    super(successor);
  }

  handle(transaction: Transaction): void {
    const transactions = this._transactionHistory.getTransactions();
    const count = transactions.reduce((n, trans) => {
      if (trans.vehicle.licensePlate === transaction.vehicle.licensePlate) {
        return ++n;
      }
      return n;
    }, 0);
    if (count > 0) {
      transaction.price = transaction.price * .5;
    }
    super.handle(transaction);
  }
}

export class LicenseValidationHandler extends TransactionHandler {

  handle(transaction: Transaction): void {
    if (transaction.vehicle.licensePlate === '1111111') {
      throw new Error('Vehicle was stolen');
    }
    super.handle(transaction);
  }
}
