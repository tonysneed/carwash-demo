import { Transaction } from 'app/models/transaction';
import { TransactionHistory } from 'app/services/transaction-history';
import { TransactionHandler } from 'app/models/transaction-handlers';
import { BasePriceHandler, DiscountHandler, TruckHandler, LicenseValidationHandler } from 'app/models/transaction-handlers';
import { Vehicle, Car, Truck, TruckBed, BedPosition } from 'app/models/vehicle';

describe('transaction handlers', () => {

  let transHistory: TransactionHistory;
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

      transHistory = new TransactionHistory();
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

      transHistory.transactions.push(existingTrans);
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

      transHistory = new TransactionHistory();
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

      transHistory.transactions.push(existingTrans);
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
      truck.truckBed.bedPosition = BedPosition.Down;
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

