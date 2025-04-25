const crypto = require('crypto');

// Generate a random key (32 bytes = 64 hex characters)
const key = crypto.randomBytes(32).toString('hex');

// Generate a random secret (32 bytes = 64 hex characters)
const secret = crypto.randomBytes(32).toString('hex');

console.log('Directus Environment Variables:');
console.log('-----------------------------');
console.log(`KEY=${key}`);
console.log(`SECRET=${secret}`); 