const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("base64");
console.log("\n=== NEXTAUTH_SECRET ===");
console.log(secret);
console.log("\nСкопируйте это значение в ваш .env файл:\n");
console.log(`NEXTAUTH_SECRET=${secret}\n`);
