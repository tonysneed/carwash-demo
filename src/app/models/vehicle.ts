export abstract class Vehicle {
  licensePlate: string;
}

export class Car extends Vehicle {
}

export class Truck extends Vehicle {
  truckBed: TruckBed = new TruckBed();
}

export class TruckBed {
  isMuddy = false;
  isDown = false;
}

export enum VehicleType {
  Car,
  Truck
}
