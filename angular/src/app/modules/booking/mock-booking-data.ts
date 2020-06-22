import { Lodging } from './../../data/lodging.model';
import { Rental } from './../../data/rental.model';
import { Review } from './../../data/review.model';
import { Location } from './../../data/location.model';
import { RentalUnit } from './../../data/rental-unit.model';
import { Booking } from './../../data/booking.model';
import { BookingSearchData } from './@types/booking-search-data';
import { FormControl } from '@angular/forms';

const mockLocations: Location[] = [
  {
    id: '0',
    address: {
      id: '0',
      city: 'Los Angeles',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'CA',
      street: '7421 Something Dr'
    },
    latitude: '34.0522',
    locale: 'N/A',
    longitude: '118.2437',
  },
  {
    id: '1',
    address: {
      id: '1',
      city: 'Austin',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'TX',
      street: '7421 Something Dr'
    },
    latitude: '30.2672',
    locale: 'N/A',
    longitude: '97.7431',
  }
];

const rentalUnitMock: RentalUnit = {
  id: 'id',
  name: 'rental unit',
  bathrooms: [],
  bedrooms: [],
  occupancy: 1,
  type: 'bungalow'
};

const mockRentals: Rental[] = [
  {
    id: '0',
    name: 'Nice Place',
    rentalUnit: rentalUnitMock,
  },
  {
    id: '1',
    name: 'Nicer Place',
    rentalUnit: rentalUnitMock,
  },
];

const mockReviews: Review[] = [
  { id: '0', accountId: '0', hotelId: '0', comment: '0', dateCreated: new Date(), rating: 4 },
];

const mockLodgings: Lodging[] = [
  {
    id: '0',
    location: mockLocations[0],
    name: 'A Place',
    rentals: mockRentals,
    reviews: mockReviews,
  },
  {
    id: '1',
    location: mockLocations[1],
    name: 'The Lodging',
    rentals: mockRentals,
    reviews: mockReviews,
  },
];

const mockBookings: Booking[] = [
  {
    id: '0',
    accountId: '0',
    lodgingId: '0',
    guests: [],
    bookingRentals: [],
    stay: null,
    status: 'Valid',
  },
];

const mockBookingSearchDataSet: BookingSearchData[] = [
  {
    guests: new FormControl(1),
    checkIn: new FormControl('2020-01-01'),
    checkOut: new FormControl('2020-02-01'),
    location: new FormControl('Los Angeles'),
  },
];

export { mockLocations, mockLodgings, mockRentals, mockReviews, mockBookings, mockBookingSearchDataSet };
