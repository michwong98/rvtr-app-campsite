/**
 * Represents the _Review_ model
 *
 * ```yaml
 * id: string;
 * accountId: string;
 * lodgingId: string;
 * comment: string;
 * dateCreated: Date;
 * rating: number;
 * ```
 */
export interface Review {
  id: string;
  accountId: string;
  lodgingId: string;
  comment: string;
  dateCreated: Date;
  rating: number;
}
