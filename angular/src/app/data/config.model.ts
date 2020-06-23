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
    account: {
      base: string;
      uri: {
        account: string;
        payment: string;
        profile: string;
      }
    };
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
