// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
// const publicKey = new PublicKey("AZRNPpBp4jifyeekwL6x3RyCZ8BxKLrsXeXuhuGqBLRC");
 
// const connection = new Connection("https://api.mainnet.solana.com", "confirmed");
 
// const balanceInLamports = await connection.getBalance(publicKey);
 
// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
// console.log(
//   `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
// );

// //Wallet Address: 8VfKEgKMhhKshg7qkVcsic5KPqtpuXMWXri3HuJtxdMu

// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
// // const suppliedPublicKey = process.argv[2];
// // if (!suppliedPublicKey) {
// //   throw new Error("Provide a public key to check the balance of!");
// // }
 
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
// const publicKey = new PublicKey(suppliedPublicKey);
 
// const balanceInLamports = await connection.getBalance(publicKey);
 
// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
// console.log(
//   `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
// );


import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// Read public key from command line arguments
const suppliedPublicKey: string | undefined = process.argv[2];
if (!suppliedPublicKey) {
  console.error("Error: Provide a public key to check the balance of!");
  process.exit(1);
}

// Initialize the connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Function to check if a string is a valid base58 public key
function isValidPublicKey(key: string): boolean {
  try {
    new PublicKey(key); // Attempt to create a PublicKey object
    return true;
  } catch {
    return false;
  }
}

// Validate the public key format
if (!isValidPublicKey(suppliedPublicKey)) {
  console.error("Error: Invalid public key format!");
  process.exit(1);
}

const publicKey = new PublicKey(suppliedPublicKey);

async function checkBalance(): Promise<void> {
  try {
    // Fetch balance
    const balanceInLamports: number = await connection.getBalance(publicKey);
    const balanceInSOL: number = balanceInLamports / LAMPORTS_PER_SOL;
    //const balanceInDol: number = balanceInSOL * 134;

    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching balance:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
    process.exit(1);
  }
}

// Check the balance
checkBalance();
