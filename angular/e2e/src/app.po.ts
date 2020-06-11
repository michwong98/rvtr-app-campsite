import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getPageFooter(): Promise<string> {
    return element(by.css('uic-footer')).getText() as Promise<string>;
  }

  getPageHeader(): Promise<string> {
    return element(by.css('uic-header')).getText() as Promise<string>;
  }
}
