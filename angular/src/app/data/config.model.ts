import { Link } from './link.model';

/**
 * Represents the _Config_ model
 *
 * ```yaml
 * api: object;
 * navigation: object;
 * ```
 */
export interface Config {
  api: {
    account: string;
    booking: {
      booking: string,
      stay: string
    };
    lodging: string;
    monitoring: string;
  };
  navigation: {
    footer: Link[];
    header: Link[];
  };
}
