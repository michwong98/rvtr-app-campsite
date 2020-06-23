export enum LodgingSortKey
{
    Id = 'Id',
    Name = 'Name',
    Description = 'Description',

    LocationId = 'Location.Id',
    Latitude = 'Location.Latitude',
    Longitude = 'Location.Longitude',
    Locale = 'Location.Locale',

    AddressId = 'Location.Address.Id',
    City = 'Location.Address.City',
    Country = 'Location.Address.Country',
    PostalCode = 'Location.Address.PostalCode',
    StateProvince = 'Location.Address.StateProvince',
    Street = 'Location.Address.Street',

    Rentals = 'Rentals',
    Beds = 'Beds',
    Bedrooms = 'Bedrooms',
    Bathrooms = 'Bathrooms',
    Occupancy = 'Occupancy',

    ReviewCount = 'ReviewCount',
    ReviewAverageRating = 'ReviewAverageRating',
}
