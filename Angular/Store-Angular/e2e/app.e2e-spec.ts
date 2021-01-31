import { StorePage } from './app.po';

describe('store App', function() {
  let page: StorePage;

  beforeEach(() => {
    page = new StorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
