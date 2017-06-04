import { Component, OnInit } from '@angular/core';
import { TransactionInfo } from 'app/models/transaction';
import { VehicleType } from 'app/models/vehicle';

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
  constructor() { }

  ngOnInit() {
  }
}
