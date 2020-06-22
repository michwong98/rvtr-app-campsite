import { Lodging } from './../../data/lodging.model';
import { Rental } from './../../data/rental.model';
import { Review } from './../../data/review.model';
import { Location } from './../../data/location.model';
import { RentalUnit } from './../../data/rental-unit.model';
import { Booking } from './../../data/booking.model';
import { Profile } from './../../data/profile.model';
import { Stay } from './../../data/stay.model';
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
      street: '7421 Something Dr',
      unit: ''
    },
    latitude: 34.0522,
    locale: 'N/A',
    longitude: 118.2437,
  },
  {
    id: '1',
    address: {
      id: '1',
      city: 'Austin',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'TX',
      street: '7421 Something Dr',
      unit: ''
    },
    latitude: 30.2672,
    locale: 'N/A',
    longitude: 97.7431,
  }
];

const rentalUnitMock: RentalUnit = {
  id: 'id',
  name: 'rental unit',
  bathrooms: [],
  bedrooms: [],
  occupancy: 1,
  rentalUnitType: '',
  description: ''
};

const mockRentals: Rental[] = [
  {
    id: '0',
    name: 'Nice Place',
    rentalUnit: rentalUnitMock,
    description: ''
  },
  {
    id: '1',
    name: 'Nicer Place',
    rentalUnit: rentalUnitMock,
    description: ''
  },
];

const mockReviews: Review[] = [
  { id: '0', accountId: '0', lodgingId: '', comment: '0', dateCreated: new Date(), rating: 4 },
];

const mockLodgings: Lodging[] = [
  {
    id: '0',
    location: mockLocations[0],
    name: 'A Place',
    rentals: mockRentals,
    reviews: mockReviews,
    description: '',
    images: [],
    amenities: []
  },
  {
    id: '1',
    location: mockLocations[1],
    name: 'The Lodging',
    rentals: mockRentals,
    reviews: mockReviews,
    description: '',
    images: [],
    amenities: []
  },
];

const mockStay: Stay = {
  checkIn: new Date(),
  checkOut: new Date(),
  dateCreated: null,
  dateModified: null,
  id: '0',
  booking: null
};

const mockBookings: Booking[] = [
  {
    id: '0',
    accountId: '0',
    lodgingId: '0',
    guests: [
      {age: 'Adult', name: {family: '', given: '', id: 1}, email: '', id: 1, phone: '', image: ''},
      {age: 'Child', name: {family: '', given: '', id: 1}, email: '', id: 1, phone: '', image: ''}
    ],
    bookingRentals: [],
    stay: mockStay,
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
