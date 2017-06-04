import { browser, by, element } from 'protractor';

export class CarwashDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.className('mat-toolbar-row')).getText();
  }
}
