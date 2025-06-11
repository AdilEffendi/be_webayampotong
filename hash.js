import bcrypt from "bcryptjs";

const hashed = bcrypt.hashSync("adminku1", 10);
console.log("HASH:", hashed);
