import { Wash, WashState, WashType } from './wash';
import * as States from './wash-states';
import { WorkerService } from 'app/services/worker.service';

describe('wash', () => {

  describe('deluxe', () => {

    let deluxeWash: Wash;
    const washType = WashType.Deluxe;
    const worker = new WorkerService();
    beforeEach(() => {
      spyOn(worker, 'work').and.returnValue(null);
    });

    describe('unwashed', () => {

      beforeEach(() => {
        deluxeWash = new Wash(washType, worker);
        deluxeWash.currentState = new States.UnWashedState(deluxeWash, worker);
      });

      it('presoap should go to presoaped state', async (done) => {
        await deluxeWash.preSoap();
        expect(deluxeWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('soap should stay in unwashed state', async (done) => {
        await deluxeWash.soap();
        expect(deluxeWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('rinse should stay in unwashed state', async (done) => {
        await deluxeWash.rinse();
        expect(deluxeWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('wax should stay in unwashed state', async (done) => {
        await deluxeWash.wax();
        expect(deluxeWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('dry should stay in unwashed state', async (done) => {
        await deluxeWash.dry();
        expect(deluxeWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });
    });

    describe('presoaped', () => {

      beforeEach(() => {
        deluxeWash = new Wash(washType, worker);
        deluxeWash.currentState = new States.PreSoapedState(deluxeWash, worker);
      });

      it('presoap should stay in presoaped state', async (done) => {
        await deluxeWash.preSoap();
        expect(deluxeWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('soap should go to soaped state', async (done) => {
        await deluxeWash.soap();
        expect(deluxeWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('rinse should stay in presoaped state', async (done) => {
        await deluxeWash.rinse();
        expect(deluxeWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('wax should stay in presoaped state', async (done) => {
        await deluxeWash.wax();
        expect(deluxeWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('dry should stay in presoaped state', async (done) => {
        await deluxeWash.dry();
        expect(deluxeWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });
    });

    describe('soaped', () => {

      beforeEach(() => {
        deluxeWash = new Wash(washType, worker);
        deluxeWash.currentState = new States.SoapedState(deluxeWash, worker);
      });

      it('presoap should stay in soaped state', async (done) => {
        await deluxeWash.preSoap();
        expect(deluxeWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('soap should stay in soaped state', async (done) => {
        await deluxeWash.soap();
        expect(deluxeWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('rinse should go to rinsed state', async (done) => {
        await deluxeWash.rinse();
        expect(deluxeWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('wax should stay in soaped state', async (done) => {
        await deluxeWash.wax();
        expect(deluxeWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('dry should stay in soaped state', async (done) => {
        await deluxeWash.dry();
        expect(deluxeWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });
    });

    describe('rinsed', () => {

      beforeEach(() => {
        deluxeWash = new Wash(washType, worker);
        deluxeWash.currentState = new States.RinsedState(deluxeWash, worker);
      });

      it('presoap should stay in rinsed state', async (done) => {
        await deluxeWash.preSoap();
        expect(deluxeWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('soap should stay in rinsed state', async (done) => {
        await deluxeWash.soap();
        expect(deluxeWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('rinse should stay in rinsed state', async (done) => {
        await deluxeWash.rinse();
        expect(deluxeWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('wax should go to waxed state', async (done) => {
        await deluxeWash.wax();
        expect(deluxeWash.currentState instanceof States.WaxedState).toBeTruthy();
        done();
      });

      it('dry should stay in rinsed state', async (done) => {
        await deluxeWash.dry();
        expect(deluxeWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });
    });

    describe('waxed', () => {

      beforeEach(() => {
        deluxeWash = new Wash(washType, worker);
        deluxeWash.currentState = new States.WaxedState(deluxeWash, worker);
      });

      it('presoap should stay in waxed state', async (done) => {
        await deluxeWash.preSoap();
        expect(deluxeWash.currentState instanceof States.WaxedState).toBeTruthy();
        done();
      });

      it('soap should stay in waxed state', async (done) => {
        await deluxeWash.soap();
        expect(deluxeWash.currentState instanceof States.WaxedState).toBeTruthy();
        done();
      });

      it('rinse should stay in waxed state', async (done) => {
        await deluxeWash.rinse();
        expect(deluxeWash.currentState instanceof States.WaxedState).toBeTruthy();
        done();
      });

      it('wax should stay in waxed state', async (done) => {
        await deluxeWash.wax();
        expect(deluxeWash.currentState instanceof States.WaxedState).toBeTruthy();
        done();
      });

      it('dry should go to dried state', async (done) => {
        await deluxeWash.dry();
        expect(deluxeWash.currentState instanceof States.DriedState).toBeTruthy();
        done();
      });
    });
  });
});
