import type { MetaFunction } from "@remix-run/node";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { RPC_URL, connection } from "~/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Login() {
  const publicKey = new PublicKey(
    "Eb9MWJHXDuYDZ64UKBYv4go1Wd8eWj2Fb9hqU2jH2KMo"
  ); // Replace 'USER_PUBLIC_KEY' with the actual public key

  const getBalance = async (publicKey: PublicKey) => {
    try {
      if (!RPC_URL) {
        console.log("window undefined");
        return;
      }
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      return balanceInSOL;
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <button
        onClick={() => {
          getBalance(publicKey).then((balance) => {
            console.log(`Balance: ${balance} SOL`);
          });
        }}
      >
        Get Balance
      </button>
      <button onClick={() => console.log("hello worl")}>cool</button>
    </div>
  );
}
