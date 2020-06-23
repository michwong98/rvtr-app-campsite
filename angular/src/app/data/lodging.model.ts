import { Location } from './location.model';
import { Image } from './image.model';
import { Review } from './review.model';
import { Rental } from './rental.model';
import { Amenity } from './amenity.model';

/**
 * Represents the _Lodging_ model
 *
 * ```yaml
 * id: string;
 * location: Location;
 * name: string;
 * rentals: Rental[];
 * reviews: Review[];
 * ```
 */
export interface Lodging {
  id: string;
  location: Location;
  name: string;
  description: string;
  rentals: Rental[];
  reviews: Review[];
  amenities: Amenity[];
  images: Image[];
}
