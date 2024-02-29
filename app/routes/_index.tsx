import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
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
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-md items-center py-12 gap-4">
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
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-blue-500 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onAddItemAnchor(content)}
          disabled={!wallet.connected}
        >
          add narrative
        </button>

        {/* List */}
        <div className="flex flex-col gap-2 pt-16">
          {narratives?.map((narrative) => (
            <>
              <div className="text-2xl font-bold">
                {narrative.account.content}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitializeComponent;
