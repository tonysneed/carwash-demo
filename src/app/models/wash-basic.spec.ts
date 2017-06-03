import { Wash, WashState, WashType } from './wash';
import * as States from './wash-states';
import { WorkerService } from 'app/services/worker.service';

describe('wash', () => {

  describe('basic', () => {

    let basicWash: Wash;
    const washType = WashType.Basic;
    const worker = new WorkerService();
    beforeEach(() => {
      spyOn(worker, 'work').and.returnValue(null);
    });

    describe('unwashed', () => {

      beforeEach(() => {
        basicWash = new Wash(washType, worker);
        basicWash.currentState = new States.UnWashedState(basicWash, worker);
      });

      it('presoap should go to presoaped state', async (done) => {
        await basicWash.preSoap();
        expect(basicWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('soap should stay in unwashed state', async (done) => {
        await basicWash.soap();
        expect(basicWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('rinse should stay in unwashed state', async (done) => {
        await basicWash.rinse();
        expect(basicWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('wax should stay in unwashed state', async (done) => {
        await basicWash.wax();
        expect(basicWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });

      it('dry should stay in unwashed state', async (done) => {
        await basicWash.dry();
        expect(basicWash.currentState instanceof States.UnWashedState).toBeTruthy();
        done();
      });
    });

    describe('presoaped', () => {

      beforeEach(() => {
        basicWash = new Wash(washType, worker);
        basicWash.currentState = new States.PreSoapedState(basicWash, worker);
      });

      it('presoap should stay in presoaped state', async (done) => {
        await basicWash.preSoap();
        expect(basicWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('soap should go to soaped state', async (done) => {
        await basicWash.soap();
        expect(basicWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('rinse should stay in presoaped state', async (done) => {
        await basicWash.rinse();
        expect(basicWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('wax should stay in presoaped state', async (done) => {
        await basicWash.wax();
        expect(basicWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });

      it('dry should stay in presoaped state', async (done) => {
        await basicWash.dry();
        expect(basicWash.currentState instanceof States.PreSoapedState).toBeTruthy();
        done();
      });
    });

    describe('soaped', () => {

      beforeEach(() => {
        basicWash = new Wash(washType, worker);
        basicWash.currentState = new States.SoapedState(basicWash, worker);
      });

      it('presoap should stay in soaped state', async (done) => {
        await basicWash.preSoap();
        expect(basicWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('soap should stay in soaped state', async (done) => {
        await basicWash.soap();
        expect(basicWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('rinse should go to rinsed state', async (done) => {
        await basicWash.rinse();
        expect(basicWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('wax should stay in soaped state', async (done) => {
        await basicWash.wax();
        expect(basicWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });

      it('dry should stay in soaped state', async (done) => {
        await basicWash.dry();
        expect(basicWash.currentState instanceof States.SoapedState).toBeTruthy();
        done();
      });
    });

    describe('rinsed', () => {

      beforeEach(() => {
        basicWash = new Wash(washType, worker);
        basicWash.currentState = new States.RinsedState(basicWash, worker);
      });

      it('presoap should stay in rinsed state', async (done) => {
        await basicWash.preSoap();
        expect(basicWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('soap should stay in rinsed state', async (done) => {
        await basicWash.soap();
        expect(basicWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('rinse should stay in rinsed state', async (done) => {
        await basicWash.rinse();
        expect(basicWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('wax should stay in rinsed state', async (done) => {
        await basicWash.wax();
        expect(basicWash.currentState instanceof States.RinsedState).toBeTruthy();
        done();
      });

      it('dry should go to dried state', async (done) => {
        await basicWash.dry();
        expect(basicWash.currentState instanceof States.DriedState).toBeTruthy();
        done();
      });
    });
  });
});
