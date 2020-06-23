/**
 * Represents the _Payment_ model
 *
 * ```yaml
 * id: string;
 * cardExpirationDate: Date;
 * cardName: string;
 * cardNumber: string;
 * ```
 */
export interface Payment {
  id: number;
  accountId?: number;
  cardExpirationDate: Date;
  cardName: string;
  cardNumber: string;
}
