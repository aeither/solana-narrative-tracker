import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PublicKey, TransactionConfirmationStrategy } from "@solana/web3.js";
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

      // Derive the PDA for the newUserAccount
      const [newUserAccountPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), wallet.publicKey.toBuffer()],
        program.programId
      );

      // Send transaction
      const txHash = await program.methods
        .initUser()
        .accounts({
          newUserAccount: newUserAccountPDA,
        })
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
      const newAccount = await program.account.userAccount.fetch(
        wallet.publicKey
      );

      console.log("On-chain data is: ", newAccount.lastId.toString());

      return txHash;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const addItemAnchor = async (content: string) => {
    try {
      if (!program || !wallet.publicKey || !wallet.signTransaction) return;

      // Fetch the created account
      const userAccount = await program.account.userAccount.fetch(
        wallet.publicKey
      );

      // Derive the PDA for the newUserAccount
      const [userAccountPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), wallet.publicKey.toBuffer()],
        program.programId
      );

      // Derive the PDA for the itemAccountPDA
      const [itemAccountPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("item"),
          wallet.publicKey.toBuffer(),
          Uint8Array.from([userAccount.lastId]),
        ],
        program.programId
      );

      // Send transaction
      const txHash = await program.methods
        .addItem(content)
        .accounts({
          userAccount: userAccountPDA,
          newItemAccount: itemAccountPDA,
        })
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
      const itemAccount = await program.account.itemAccount.fetch(
        itemAccountPDA
      );

      console.log("On-chain data is: ", itemAccount.content);

      return txHash;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return {
    program,
    initUserAnchor,
    addItemAnchor,
  };
}
