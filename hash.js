const bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync("admin123", 10)); // Replace "admin123" with your real password
