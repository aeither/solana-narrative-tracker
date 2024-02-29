import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TransactionConfirmationStrategy } from "@solana/web3.js";
import { BN } from "bn.js";
import { useEffect, useState } from "react";
import { PROGRAM_ID, connection } from "~/constants";
import { IDL, IDLType } from "~/constants/idl";

export type SetUserAnchor = (
  score: number,
  health: number
) => Promise<string | undefined>;

export default function useProgram() {
  const wallet = useWallet();
  const [program, setProgram] = useState<Program<IDLType>>();

  useEffect(() => {
    // Load program when sdk is defined
    load();
    async function load() {
      if (wallet.wallet) {
        const provider = new AnchorProvider(
          connection,
          wallet as any,
          AnchorProvider.defaultOptions()
        );

        const program = new Program(IDL, PROGRAM_ID, provider);
        setProgram(program);
      }
    }
  }, [wallet]);

  const initUserAnchor = async () => {
    try {
      if (!program || !wallet.publicKey || !wallet.signTransaction) return;

      const newAccountKp = new web3.Keypair();

      // For enum
      // const state = program.programIdl.enums.find((e) => e.name === "AppState")
      //   .variants[1].name;

      // Send transaction
      const data = new BN(42);
      const txHash = await program.methods
        .initialize(data)
        .accounts({
          newAccount: newAccountKp.publicKey,
        })
        .signers([newAccountKp])
        .rpc();
      console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

      // Confirm transaction
      const commitment = "confirmed";
      const latestBlockHash = await connection.getLatestBlockhash(commitment);
      const strategy: TransactionConfirmationStrategy = {
        signature: txHash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        blockhash: latestBlockHash.blockhash,
      };
      await connection.confirmTransaction(strategy, commitment);

      // Fetch the created account
      const newAccount = await program.account.newAccount.fetch(
        newAccountKp.publicKey
      );

      console.log("On-chain data is:", newAccount.data.toString());

      return txHash;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return {
    program,
    initUserAnchor,
  };
}
