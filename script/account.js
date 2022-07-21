const solanaWeb3 = require('@solana/web3.js'),
    bip39 = require('bip39'),
    ed25519HdKey = require('ed25519-hd-key');

const generatedMnemonic = bip39.generateMnemonic(),
    seedPhrase = bip39.mnemonicToSeedSync(generatedMnemonic).slice(0, 32),
    seedBuffer = Buffer.from(seedPhrase).toString('hex'),
    path44Change = `m/44'/501'/0'/0'`,
    derivedSeed = ed25519HdKey.derivePath(path44Change, seedBuffer).key,
    seedKeypair = solanaWeb3.Keypair.fromSeed(derivedSeed);

console.log(generatedMnemonic);
console.log(seedKeypair.secretKey);
console.log(seedKeypair.publicKey.toString()); // Address
console.log(seedKeypair.publicKey.toBase58()); // Address

console.log('------------------------------------------------------------');

const account = solanaWeb3.Keypair.generate();
console.log(account.secretKey);
console.log(account.publicKey.toString());
console.log(account.publicKey.toBase58());

console.log('------------------------------------------------------------');

let seed = Uint8Array.from(JSON.parse(process.env.secretKey));
let accountFromSeed = solanaWeb3.Keypair.fromSeed(seed);

console.log(accountFromSeed.publicKey.toBase58());
console.log(accountFromSeed.secretKey);

console.log('------------------------------------------------------------');

let accountFromSecret = solanaWeb3.Keypair.fromSecretKey(account.secretKey);
const pubKey = accountFromSecret.publicKey.toBase58();

console.log(pubKey == account.publicKey.toBase58());
console.log(pubKey);
console.log(accountFromSecret.secretKey);