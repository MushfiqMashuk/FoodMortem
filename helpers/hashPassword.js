import { AES } from "crypto-js";

const encryptPassword = (str) =>
  AES.encrypt(str, process.env.SECRET_PASS_PHRASE);
const decryptPassword = (encrypted) =>
  AES.encrypt(encrypted, process.env.SECRET_PASS_PHRASE);

export {
  encryptPassword,
  decryptPassword,
};
