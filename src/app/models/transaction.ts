import { Vehicle } from 'app/models/vehicle';

export class Transaction {
  timestamp = new Date();
  vehicle: Vehicle;
  price = 0;
}
