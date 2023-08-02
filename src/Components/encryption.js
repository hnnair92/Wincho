import React from 'react'
import CryptoJS from 'crypto-js';

const encryption = () => {
    const encrypt = (plaintext, key, iv) => {
        const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
        const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
      
        const ciphertext = CryptoJS.AES.encrypt(plaintext, keyUtf8, {
          iv: ivUtf8,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
      
        return ciphertext.toString();
      };
    //   const samjs ={
    //     "glossary": {
    //         "title": "example glossary",
    //         "GlossDiv": {
    //             "title": "S",
    //             "GlossList": {
    //                 "GlossEntry": {
    //                     "ID": "SGML",
    //                     "SortAs": "SGML",
    //                     "GlossTerm": "Standard Generalized Markup Language",
    //                     "Acronym": "SGML",
    //                     "Abbrev": "ISO 8879:1986",
    //                     "GlossDef": {
    //                         "para": "A meta-markup language, used to create markup languages such as DocBook.",
    //                         "GlossSeeAlso": ["GML", "XML"]
    //                     },
    //                     "GlossSee": "markup"
    //                 }
    //             }
    //         }
    //     }
    // }
    // const myJson =JSON.stringify(samjs)
    //   const plaintext = myJson;
    //   const key = 'ocpwincha4tR5d0P';
    //   const iv = 'ocpwincha7h3XrYb'; 
      
    //   const encryptedText = encrypt(plaintext, key, iv);
    //   console.log('Encrypted:', encryptedText);
            
  return (
    <div>

        <h1>ENCRYPTION</h1>
    </div>
  )
}

export default encryption