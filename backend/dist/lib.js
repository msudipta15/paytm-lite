"use strict";
// Generate random account balance for users
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBalance = generateBalance;
function generateBalance() {
    const amount = (1 + 10000 * Math.random()).toFixed(2);
    return amount;
}
