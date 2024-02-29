import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "~/hooks/use-program";

const InitializeComponent = () => {
  const { initUserAnchor } = useProgram();
  const wallet = useWallet();

  const onInitializeClick = async () => {
    console.log("before...");

    await initUserAnchor();

    console.log("...after");
  };

  return (
    <div className="App">
      <WalletMultiButton />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onInitializeClick}
        disabled={!wallet.connected}
      >
        Initialize
      </button>
    </div>
  );
};

export default InitializeComponent;
