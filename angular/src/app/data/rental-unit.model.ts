import { Bathroom } from './bathroom.model';
import { Bedroom } from './bedroom.model';

/**
 * Represents the _RentalUnit_ model
 *
 * ```yaml
 * id: string;
 * bathrooms: Bathroom[];
 * bedrooms: Bedroom[];
 * name: string;
 * occupancy: number;
 * type: string;
 * ```
 */
export interface RentalUnit {
  id: string;
  bathrooms: Bathroom[];
  bedrooms: Bedroom[];
  name: string;
  description: string;
  occupancy: number;
  rentalUnitType: string;
}
