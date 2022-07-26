const { Connection, LAMPORTS_PER_SOL, Keypair } = require('@solana/web3.js')
const { Contract, publicKeyToHex } = require('@solana/solidity')
const { readFileSync } = require('fs')

const myname_ABI = JSON.parse(readFileSync('./build/MyName.abi', 'utf8'))
const BUNDLE_SO = readFileSync('./build/bundle.so')

;(async function () {
    console.log('Connecting to your local Solana node ...')
    const connection = new Connection(
        // works only for localhost at the time of writing
        // see https://github.com/solana-labs/solana-solidity.js/issues/8
        'http://localhost:8899',// "https://api.devnet.solana.com",
        'confirmed'
    );

    const payer = Keypair.generate();
    console.log('Airdropping (from faucet) SOL to a new wallet ...');
    const signature = await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature, 'confirmed');
    console.log('balance: ', await connection.getBalance(payer.publicKey));
    const program = Keypair.generate();
    const storage = Keypair.generate();
    console.log('payer: ', payer.publicKey.toBase58());
    console.log('program: ', program.publicKey.toBase58());
    console.log('storage: ', storage.publicKey.toBase58());

    const contract = new Contract(connection, program.publicKey, storage.publicKey, myname_ABI, payer);

    console.log('Deploying the Solang-compiled myname program ...');
    await contract.load(program, BUNDLE_SO);

    console.log('Program deployment finished, deploying myname ...');
    await contract.deploy('MyName', [], storage, 4096 * 8);

    console.log('Contract deployment finished, invoking contract functions ...');
    const version = await contract.version();
    console.log(`myname contract for version ${version} deployed!`);

    console.log('set name & get name...');
    const { events } = await contract.functions.setname('test name');

    console.log('"SetName" event ...');
    console.log(`name event: ${events[0].name}`);
    console.log(`owner: ${events[0].args.owner}`);
    console.log(`name: ${events[0].args.name}`);

    const address = publicKeyToHex(payer.publicKey);
    const getname = await contract.myname(address);
    console.log(`name for address ${address} is ${getname}`);

    process.exit(0)
})()