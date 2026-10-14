import bcrypt from "bcrypt";

const encryptPassword = async (str) => bcrypt.hash(str, 10);

const comparePassword = async (password, encryptedPassword) =>
  bcrypt.compare(password, encryptedPassword);

export { encryptPassword, comparePassword };
