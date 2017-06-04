import { CarwashDemoPage } from './app.po';

describe('carwash-demo App', () => {
  let page: CarwashDemoPage;

  beforeEach(() => {
    page = new CarwashDemoPage();
  });

  it('should display message saying ACME Car Wash', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ACME Car Wash');
  });
});
