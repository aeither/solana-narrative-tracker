import { Connection, PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey(
  `4ZSk3uQwzMVNKfcy7nWcgXnB1EbrRPBBtFjuf84oz6aW`
);

export const RPC_URL =
  typeof window !== "undefined"
    ? `https://devnet.helius-rpc.com/?api-key=${
        (window as unknown as any).ENV.HELIUS_API_KEY
      }`
    : "https://api.devnet.solana.com";

export const connection = new Connection(RPC_URL, "confirmed");
