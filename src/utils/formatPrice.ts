/**
 * Formats a price value (in cents) to a localized currency string.
 * @param price - Price amount in cents (e.g., 1299 for $12.99)
 * @returns Formatted price string with currency symbol (e.g., "$12.99")
 * @example
 * formatPrice(1299) // returns "$12.99"
 * formatPrice(29999) // returns "$299.99"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
}
