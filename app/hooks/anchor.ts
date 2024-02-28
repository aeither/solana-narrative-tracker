import { AnchorProvider, Program, Provider, web3 } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
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
          wallet.wallet as any,
          AnchorProvider.defaultOptions()
        );

        const program = new Program(IDL, PROGRAM_ID, provider);

        setProgram(program);
      }
    }
  }, [wallet]);

  const initUserAnchor = async () => {
    try {
      if (!program || !wallet.publicKey) return;

      const newAccountKp = new web3.Keypair();

      // Find user account. PDA
      //   const [userAccountAddress] = PublicKey.findProgramAddressSync(
      //     [Buffer.from("user"), wallet.publicKey.toBuffer()],
      //     PROGRAM_ID
      //   );

      // Send transaction
      const data = new BN(42);
      const txHash = await program.methods
        .initialize(data)
        .accounts({
          newAccount: wallet.publicKey,
        })
        .rpc();
      console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

      // Confirm transaction
      await connection.confirmTransaction(txHash);

      // Fetch the created account
      const newAccount = await program.account.NewAccount.fetch(
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
