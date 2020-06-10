import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { link } from 'fs';

describe('project rvtr-app-campsite', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page footer', () => {
    page.navigateTo();
    expect(page.getPageFooter()).toContain('RVTR');
  });

  it('should display page header', () => {
    page.navigateTo();
    expect(page.getPageHeader()).toContain('Campsite');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
