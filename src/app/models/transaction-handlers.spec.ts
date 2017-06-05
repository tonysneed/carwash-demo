import { Transaction } from 'app/models/transaction';
import { TransactionHistoryService } from 'app/services/transaction-history.service';
import { TransactionHandler } from 'app/models/transaction-handlers';
import { BasePriceHandler, DiscountHandler, TruckHandler, LicenseValidationHandler } from 'app/models/transaction-handlers';
import { Vehicle, Car, Truck, TruckBed } from 'app/models/vehicle';

describe('transaction handlers', () => {

  let transHistory: TransactionHistoryService;
  let licenseHandler: LicenseValidationHandler;
  let discountHandler: DiscountHandler;
  let truckHandler: TruckHandler;
  let baseHandler: BasePriceHandler;

  describe('cars', () => {

    let car: Car;
    let transaction: Transaction;

    beforeEach(() => {
      car = new Car();
      car.licensePlate = '1234567';
      transaction = new Transaction();
      transaction.vehicle = car;
      transHistory = new TransactionHistoryService();
      transHistory.clearTransactions();
      licenseHandler = new LicenseValidationHandler();
      discountHandler = new DiscountHandler(transHistory, licenseHandler);
      truckHandler = new TruckHandler(discountHandler);
      baseHandler = new BasePriceHandler(truckHandler);
    });

    it('transaction should set base price', () => {

      baseHandler.handle(transaction);
      expect(transaction.price).toEqual(5);
    });

    it('transaction should apply discount', () => {

      const existingTrans = new Transaction();
      existingTrans.timestamp.setDate(existingTrans.timestamp.getDate() - 1);
      existingTrans.vehicle = car;
      existingTrans.price = 5;

      transHistory.addTransaction(existingTrans);
      baseHandler.handle(transaction);
      expect(transaction.price).toEqual(2.5);
    });

    it('transaction should reject stolen vehicle', () => {
      car.licensePlate = '1111111';
      const func = () => {
        baseHandler.handle(transaction);
      };
      expect(func).toThrowError('Vehicle was stolen');
    });
  });

  describe('trucks', () => {

    let truck: Truck;
    let transaction: Transaction;

    beforeEach(() => {
      truck = new Truck();
      truck.licensePlate = '1234567';
      transaction = new Transaction();
      transaction.vehicle = truck;
      transHistory = new TransactionHistoryService();
      transHistory.clearTransactions();
      licenseHandler = new LicenseValidationHandler();
      discountHandler = new DiscountHandler(transHistory, licenseHandler);
      truckHandler = new TruckHandler(discountHandler);
      baseHandler = new BasePriceHandler(truckHandler);
    });

    it('transaction should set base price', () => {

      baseHandler.handle(transaction);
      expect(transaction.price).toEqual(10);
    });

    it('transaction should apply discount', () => {

      const existingTrans = new Transaction();
      existingTrans.timestamp.setDate(existingTrans.timestamp.getDate() - 1);
      existingTrans.vehicle = truck;
      existingTrans.price = 5;

      transHistory.addTransaction(existingTrans);
      baseHandler.handle(transaction);
      expect(transaction.price).toEqual(5);
    });

    it('transaction should reject stolen vehicle', () => {
      truck.licensePlate = '1111111';
      const func = () => {
        baseHandler.handle(transaction);
      };
      expect(func).toThrowError('Vehicle was stolen');
    });

    it('transaction should reject truck with bed let down', () => {
      truck.truckBed.isDown = true;
      const func = () => {
        baseHandler.handle(transaction);
      };
      expect(func).toThrowError('Truck bed let down');
    });

    it('transaction charge more for mud in bed', () => {

      truck.truckBed.isMuddy = true;
      baseHandler.handle(transaction);
      expect(transaction.price).toEqual(12);
    });
  });
});

