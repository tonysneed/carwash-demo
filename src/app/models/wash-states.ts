import { Wash, WashState, WashType } from './wash';
import { WorkerService } from 'app/services/worker.service';

export class UnWashedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
    await this._worker.work();
    this._wash.currentState = this._wash.states.preSoapedState;
  }
  async soap(): Promise<void> {
  }
  async rinse(): Promise<void> {
  }
  async wax(): Promise<void> {
  }
  async dry(): Promise<void> {
  }
}

export class PreSoapedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
  }
  async soap(): Promise<void> {
    await this._worker.work();
    this._wash.currentState = this._wash.states.soapedState;
  }
  async rinse(): Promise<void> {
  }
  async wax(): Promise<void> {
  }
  async dry(): Promise<void> {
  }
}

export class SoapedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
  }
  async soap(): Promise<void> {
  }
  async rinse(): Promise<void> {
    await this._worker.work();
    this._wash.currentState = this._wash.states.rinsedState;
  }
  async wax(): Promise<void> {
  }
  async dry(): Promise<void> {
  }
}

export class RinsedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
  }
  async soap(): Promise<void> {
  }
  async rinse(): Promise<void> {
  }
  async wax(): Promise<void> {
    await this._worker.work();
    this._wash.currentState = this._wash.states.waxedState;
  }
  async dry(): Promise<void> {
    if (this._wash.washType === WashType.Basic) {
      await this._worker.work();
      this._wash.currentState = this._wash.states.driedState;
    }
  }
}

export class WaxedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
  }
  async soap(): Promise<void> {
  }
  async rinse(): Promise<void> {
  }
  async wax(): Promise<void> {
  }
  async dry(): Promise<void> {
    await this._worker.work();
    this._wash.currentState = this._wash.states.driedState;
  }
}

export class DriedState implements WashState {

  constructor(private _wash: Wash, private _worker: WorkerService) {
  }

  async preSoap(): Promise<void> {
  }
  async soap(): Promise<void> {
  }
  async rinse(): Promise<void> {
  }
  async wax(): Promise<void> {
  }
  async dry(): Promise<void> {
  }
}
