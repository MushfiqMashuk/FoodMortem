import crypto from "node:crypto";

const encryptPassword = (str) =>
  crypto.pbkdf2Sync(str, process.env.SALT, 1000, 64, `sha512`).toString(`hex`);

export { encryptPassword };
