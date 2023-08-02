// encryptionUtils.js
import CryptoJS from 'crypto-js';

export const encrypt = (plaintext, key, iv) => {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  console.log(key,"keyyy")
  console.log(iv,"ivvvv");
  const ciphertext = CryptoJS.AES.encrypt(plaintext, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return ciphertext.toString();
};
