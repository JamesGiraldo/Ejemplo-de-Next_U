import { PruebasPage } from './app.po';

describe('pruebas App', function() {
  let page: PruebasPage;

  beforeEach(() => {
    page = new PruebasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
