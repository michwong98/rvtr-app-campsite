import { AppPage } from './app.po';
import { BookingPage } from './booking.po';
import { browser, logging, element, by, Ptor, protractor } from 'protractor';
import { SSL_OP_NO_TICKET } from 'constants';

describe('project rvtr-app-campsite', () => {
  let page: AppPage;
  let booking: BookingPage;

  beforeEach(() => {
    page = new AppPage();
    booking = new BookingPage();
  });

  /**
   * Booking e2e
   */
  it('Booking page should have header Booking', () => {
    booking.navigateToBooking();
    const headerText = element(by.css('h1')).getText();
    expect(headerText).toBeTruthy();
    expect(headerText).toContain('Booking');
  });

  it('should have form with location label', (async () => {
    booking.navigateToBooking();
    const allLabels = element.all(by.css('label')).getText();
    expect(allLabels).toMatch('Location');
    expect(allLabels).toMatch('Check-In / Check-Out');
    expect(allLabels).toMatch('Guests');
  }));

  it('should have button with name search', () => {
    booking.navigateToBooking();
    const buttonName = element(by.css('button')).getText();
    expect(buttonName).toBe('search');
  });

});
