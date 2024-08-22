import "./App.css";
import 'react-tooltip/dist/react-tooltip.css'

import { Home } from "./components/Home";
import { Wallet } from "./components/Wallet";
import { useWalletContext } from "./context/WalletProvider";

function App() {
  const { wallet } = useWalletContext();

  const CREATE_MNEMONIC_VIEW = wallet?.accounts?.length === 0;
  const WALLET_VIEW = !CREATE_MNEMONIC_VIEW;
  
  return (
    <main className="w-full h-screen grid place-items-center bg-[#e2dffe]">
      {CREATE_MNEMONIC_VIEW && (
        <div className="h-[480px] w-[420px] bg-[#222222] rounded-xl">
          <Home />
        </div>
      )}

      {WALLET_VIEW && <div className="h-[650px] overflow-hidden w-[500px] bg-[#222222] rounded-xl relative">
        <Wallet />
      </div>}
    </main>
  );
}

export default App;
