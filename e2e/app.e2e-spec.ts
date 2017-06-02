import { CarwashDemoPage } from './app.po';

describe('carwash-demo App', () => {
  let page: CarwashDemoPage;

  beforeEach(() => {
    page = new CarwashDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
