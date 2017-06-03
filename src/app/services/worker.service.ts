import { Injectable } from '@angular/core';

@Injectable()
export class WorkerService {

  timeout = 5000;

  async work(): Promise<void> {
    await setTimeout(() => {
      console.log(`Worked ${this.timeout} milliseconds`);
    }, this.timeout);
  }
}
