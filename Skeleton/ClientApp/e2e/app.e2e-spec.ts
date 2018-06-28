import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title Skeleton', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Skeleton');
  });


  it('should have a menu with 4 elements ', () => {
    page.navigateTo();    
    expect(page.getMenu().count()).toBe(4);
  });


  /*
  it('should display the menu for someone not logged', () => {
    page.navigateTo();

  })
  */
});
