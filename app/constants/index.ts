import { Connection, PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey(
  `CfqCT3ojotQKHizmE73CBo95LT6MLCKQCEm3dnztJPUk`
);

export const RPC_URL =
  typeof window !== "undefined"
    ? `https://devnet.helius-rpc.com/?api-key=${
        (window as unknown as any).ENV.HELIUS_API_KEY
      }`
    : "https://api.devnet.solana.com";

export const connection = new Connection(RPC_URL, "confirmed");
