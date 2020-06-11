import { browser, by, element } from 'protractor';

export class BookingPage {
  
  navigateToBooking(): Promise<unknown> {
    return browser.get('/booking') as Promise<unknown>;
  }
}