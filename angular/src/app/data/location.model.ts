import { Address } from './address.model';

/**
 * Represents the _Location_ model
 *
 * id: string;
 * address: Address;
 * latitude: string;
 * locale: string;
 * longitude: string;
 */
export interface Location {
  id: string;
  address: Address;
  latitude: number;
  locale: string;
  longitude: number;
}
