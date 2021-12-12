
var aes256 = require("aes256");

var secret_key = "YHETGDYydhfyr36=";

export const toEncrypt = (text)=> aes256.encrypt(secret_key,text);

export const toDecrypt = (cipher, username)=>{
     
    if(cipher.startsWith("Welcome")) {
        return cipher;
    }

    if(cipher.startsWith(username)){
        return cipher;
    }

    return aes256.decrypt(secret_key, cipher);
}