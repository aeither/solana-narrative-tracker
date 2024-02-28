export const PROGRAM_ID = `4ZSk3uQwzMVNKfcy7nWcgXnB1EbrRPBBtFjuf84oz6aW`;

export const RPC_URL =
  typeof window !== "undefined"
    ? `https://devnet.helius-rpc.com/?api-key=${window.ENV.HELIUS_API_KEY}`
    : undefined;
