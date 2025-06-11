/**
 * Formats a number as Indonesian currency (Rupiah)
 * @param amount The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("id-ID");
}
