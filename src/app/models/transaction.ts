import { Vehicle, VehicleType, TruckBed } from 'app/models/vehicle';

export class Transaction {
  timestamp = new Date();
  vehicle: Vehicle;
  price = 0;
}

export class TransactionInfo {
  firstName = '';
  licensePlate = '';
  vehicleType = VehicleType[VehicleType.Car];
  truckBed = new TruckBed();
  includeWax = false;
}
