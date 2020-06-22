import { Amenity } from './amenity.model';
import { Image } from './image.model';
import { BedType } from './bedtype.model';

/**
 * Represents the _Bedroom_ model
 *
 * ```yaml
 * id: string;
 * bedCount: number;
 * bedType: BedType;
 * roomNumber: string;
 * images: Image[];
 * amenities: Amenity[];
 * ```
 */
export interface Bedroom {
  id: string;
  bedCount: number;
  bedType: BedType;
  roomNumber: string;
  images: Image[];
  amenities: Amenity[];
}
