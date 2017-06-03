import * as States from './wash-states';
import { WorkerService } from 'app/services/worker.service';

export interface WashState {
  preSoap(): Promise<void>;
  soap(): Promise<void>;
  rinse(): Promise<void>;
  wax(): Promise<void>;
  dry(): Promise<void>;
}

export enum WashType {
  Basic,
  Deluxe
}

export class Wash implements WashState {

  states: WashStates;
  currentState: WashState;

  constructor(public washType: WashType, private _worker: WorkerService) {
    this.states = new WashStates(this, this._worker);
    this.currentState = this.states.unwashedState;
  }

  async preSoap(): Promise<void> {
    return await this.currentState.preSoap();
  }
  async soap(): Promise<void> {
    return await this.currentState.soap();
  }
  async rinse(): Promise<void> {
    return await this.currentState.rinse();
  }
  async wax(): Promise<void> {
    if (this.washType === WashType.Basic) {
      return;
    }
    return await this.currentState.wax();
  }
  async dry(): Promise<void> {
    return await this.currentState.dry();
  }
}

class WashStates {

  unwashedState: WashState;
  preSoapedState: WashState;
  soapedState: WashState;
  rinsedState: WashState;
  waxedState: WashState;
  driedState: WashState;

  constructor(wash: Wash, private _worker: WorkerService) {
    this.unwashedState = new States.UnWashedState(wash, _worker);
    this.preSoapedState = new States.PreSoapedState(wash, _worker);
    this.soapedState = new States.SoapedState(wash, _worker);
    this.rinsedState = new States.RinsedState(wash, _worker);
    this.waxedState = new States.WaxedState(wash, _worker);
    this.driedState = new States.DriedState(wash, _worker);
  }
}

