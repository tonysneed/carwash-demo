import { Component, OnInit } from '@angular/core';
import { TransactionInfo, Transaction } from 'app/models/transaction';
import { VehicleType, Vehicle, Car, Truck } from 'app/models/vehicle';
import { TransactionService } from 'app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'ACME Car Wash';
  vehicleTypes = [
    VehicleType[VehicleType.Car],
    VehicleType[VehicleType.Truck]
  ];
  priceInfo = '';
  requestInfo = '';
  priceError = '';
  washInfo = '';
  washError = '';
  transactionInfo = new TransactionInfo();
  currentTransaction: Transaction;

  showRequestInfo() {
    this.requestInfo = `Name: ${this.transactionInfo.firstName},
    License: ${this.transactionInfo.licensePlate},
    Vehicle Type: ${this.transactionInfo.vehicleType},
    Truck Bed Muddy: ${this.transactionInfo.truckBed.isMuddy},
    Truck Bed Down: ${this.transactionInfo.truckBed.isDown},
    Include Wax: ${this.transactionInfo.includeWax}`;
  }

  processTransaction() {

    if (!this.transactionInfo.licensePlate) {
      this.priceError = 'License plate is required to get a price';
      return;
    }

    this.priceInfo = '';
    this.priceError = '';
    this.washInfo = '';
    this.washError = '';
    this.currentTransaction = null;

    const vehicle = this.getVehicle(this.transactionInfo);
    const transaction = new Transaction();
    transaction.timestamp = new Date();
    transaction.name = this.transactionInfo.firstName;
    transaction.vehicle = vehicle;
    transaction.includeWax = this.transactionInfo.includeWax;

    try {
      this._transactionService.processTransaction(transaction);
      this.priceInfo = transaction.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      this.currentTransaction = transaction;
    } catch (error) {
      this.priceError = error.message;
    }
  }

  processCarWash() {

    this.washInfo = '';
    this.washError = '';

    if (this.currentTransaction) {
      this._transactionService.saveTransaction(this.currentTransaction);
      const greeting = this.currentTransaction.name ? `Congratulations ${this.currentTransaction.name}!` : 'Congratulations!';
      this.washInfo = `${greeting} Your car wash transaction has been saved`;
      this.priceInfo = '';
      this.currentTransaction = null;
    } else {
      this.washError = 'You need to get a price before starting a car wash';
    }
  }

  getVehicle(transactionInfo: TransactionInfo): Vehicle {

    let vehicle: Vehicle;
    const vehicleType: VehicleType = VehicleType[transactionInfo.vehicleType];

    switch (vehicleType) {
      case VehicleType.Car:
        vehicle = new Car();
        break;
      case VehicleType.Truck:
        vehicle = new Truck();
        break;
      default:
        throw new Error(`Unsupported vehicle type: ${this.transactionInfo.vehicleType}`);
    }
    vehicle.licensePlate = transactionInfo.licensePlate;
    if (vehicle instanceof Truck) {
      vehicle.truckBed.isDown = transactionInfo.truckBed.isDown;
      vehicle.truckBed.isMuddy = transactionInfo.truckBed.isMuddy;
    }
    return vehicle;
  }

  constructor(private _transactionService: TransactionService) { }

  ngOnInit() {
  }
}
