const bs58 = require("bs58");

// Replace with your raw private key array
const rawPrivateKey = Uint8Array.from([2XTDFTRDvEmeg3dBz3TbA6df5BJraaah1ocRKySUb3rS3Uu9rbcWGC6V61Cow8qgWKAXY32NbwgPmk5i9syYd6Xi]);

// Encode the private key to Base58 format
const base58PrivateKey = bs58.encode(rawPrivateKey);

console.log("Base58-Encoded Private Key:", base58PrivateKey);
