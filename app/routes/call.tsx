import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { Suspense, useEffect, useState } from "react";
import useProgram from "~/hooks/use-program";

const InitializeComponent = () => {
  const { initUserAnchor, program, addItemAnchor } = useProgram();
  const wallet = useWallet();

  const [user, setUser] = useState<string | undefined>(undefined);
  const [narratives, setNarratives] = useState<any[]>();
  const [content, setContent] = useState("");

  const onInitializeClick = async () => {
    await initUserAnchor();
  };

  const onAddItemAnchor = async (content: string) => {
    await addItemAnchor(content);

    setContent("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (program && wallet && wallet.publicKey) {
        try {
          const [userAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("user"), wallet.publicKey.toBuffer()],
            program.programId
          );

          const userAccount = await program.account.userAccount.fetch(
            userAccountPDA
          );

          setUser(userAccount.authority.toString());
        } catch (error) {
          setUser("");
          console.error(error);
        }
      }
    };
    fetchUser();
  }, [wallet, program]);

  useEffect(() => {
    const fetchNarratives = async () => {
      if (program && wallet && wallet.publicKey) {
        const myItemAccounts = await program.account.itemAccount.all([
          {
            memcmp: {
              offset: 8, // Discriminator.
              bytes: wallet.publicKey.toString(),
            },
          },
        ]);

        // myItemAccounts[0].account.content
        setNarratives(myItemAccounts);
      }
    };
    fetchNarratives();
  }, [wallet, program]);

  return (
    <Suspense>
      <div className="flex w-full flex-col">
        <WalletMultiButton />

        {user == "" && (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onInitializeClick}
              disabled={!wallet.connected}
            >
              Initialize
            </button>
          </>
        )}

        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onAddItemAnchor(content)}
          disabled={!wallet.connected}
        >
          add narrative
        </button>

        {/* List */}
        <div className="flex gap-2">
          {narratives?.map((narrative) => (
            <>
              <div>{narrative.account.content}</div>
            </>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default InitializeComponent;
