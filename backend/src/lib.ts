// Generate random account balance for users

export function generateBalance() {
  const amount = (1 + 10000 * Math.random()).toFixed(2);
  return amount;
}
