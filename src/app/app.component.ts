import { Component } from '@angular/core';
import { VehicleType } from 'app/models/vehicle';
import { TransactionInfo } from 'app/models/transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ACME Car Wash';
  vehicleTypes = [
    VehicleType[VehicleType.Car],
    VehicleType[VehicleType.Truck]
  ];
  transactionInfo = new TransactionInfo();
  priceInfo = '';
  requestInfo = '';
  showRequestInfo() {
    this.requestInfo = `Name: ${this.transactionInfo.firstName},
    License: ${this.transactionInfo.licensePlate},
    Vehicle Type: ${this.transactionInfo.vehicleType},
    Truck Bed Muddy: ${this.transactionInfo.truckBed.isMuddy},
    Truck Bed Down: ${this.transactionInfo.truckBed.isDown},
    Include Wax: ${this.transactionInfo.includeWax}`;
  }
}
