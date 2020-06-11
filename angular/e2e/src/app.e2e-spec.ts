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

  /**
   * Booking e2e
   */
  it('Booking page should have header Booking',()=>{
    page.navigateToBooking();
    const headerText = element(by.css('h1')).getText();
    expect(headerText).toBeTruthy();
    expect(headerText).toContain('Booking');
  });

  it('should have form with location label', ()=>{
    page.navigateToBooking();
    const allLabels = element.all(by.css('label')).getText();
    expect(allLabels).toContain('location');
    expect(allLabels).toContain('check-in / check-out');
    expect(allLabels).toContain('Guests(Adults/Children)')
  });

  it('should have button with name search', ()=>{
    page.navigateToBooking();
    const buttonName = element(by.css('button')).getText();
    expect(buttonName).toBe('search')
  });

  it('should do something when search is clicked', ()=>{
    // TODO: after submit has been implemented, adjust test accordingly
    page.navigateToBooking();
    const searchBtn = element(by.buttonText('search'));
    searchBtn.click();
    expect(searchBtn.getText()).toBe('search')
  });

  it('should have image', ()=>{
    page.navigateToBooking();
    const image = element(by.css('img'));
    expect(image).toBeTruthy();
    const source = image.getAttribute('src');
    expect(source).toBe('https://bulma.io/images/placeholders/1280x960.png');
  });

  it('should have spotlight', ()=>{
    page.navigateToBooking();
    const spotlight = element(by.className('title has-text-light is-4')).getText();
    expect(spotlight).toBe('spotlight');

  });

  it('should contain spotlight text', ()=>{
    // TODO: when search has been implemented text should change based on 
    // location searched. 
    page.navigateToBooking();
    const spotlightText = element(by.cssContainingText('p',' Lorem ipsum dolor,')).getText();
    expect(spotlightText).toBeTruthy();
    expect(spotlightText).toContain('p',' Lorem ipsum dolor,');
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
