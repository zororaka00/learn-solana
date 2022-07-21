const solanaWeb3 = require('@solana/web3.js');

let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

let slot = await connection.getSlot();
console.log(slot);

console.log('------------------------------------------------------------');

let blockTime = await connection.getBlockTime(slot);
console.log(blockTime);

console.log('------------------------------------------------------------');

let block = await connection.getBlock(slot);
console.log(block.blockHeight);
console.log(block.blockTime);
console.log(block.blockhash);
console.log(block.parentSlot);
console.log(block.previousBlockhash);
/*
{
    blockHeight: null,
    blockTime: 1630747045,
    blockhash: 'AsFv1aV5DGip9YJHHqVjrGg6EKk55xuyxn2HeiN9xQyn',
    parentSlot: 93186438,
    previousBlockhash: '11111111111111111111111111111111',
    rewards: [],
    transactions: []
}
*/

console.log('------------------------------------------------------------');

let slotLeader = await connection.getSlotLeader();
console.log(slotLeader);