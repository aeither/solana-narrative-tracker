import type { MetaFunction } from "@remix-run/node";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Login() {
  const connection = new Connection(
    "https://devnet.helius-rpc.com/?api-key=5736f959-cb76-47bc-91ba-b0e87039cb61",
    "confirmed"
  );

  const publicKey = new PublicKey(
    "Eb9MWJHXDuYDZ64UKBYv4go1Wd8eWj2Fb9hqU2jH2KMo"
  ); // Replace 'USER_PUBLIC_KEY' with the actual public key

  const getBalance = async (publicKey: PublicKey) => {
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      console.log(`Balance: ${balanceInSOL} SOL`);
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
            // Do something with the balance
          });
        }}
      >
        Get Balance
      </button>
      <button onClick={() => console.log("hello worl")}>cool</button>
    </div>
  );
}
