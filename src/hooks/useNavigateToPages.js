import { PAGE_TYPES } from "../constants";
import { useStore } from "../store";

export const useNavigateToPages = () => {
  const { page, openPage } = useStore();
  const {selectedWallet, setSelectedWallet} = useStore(state => state);
  
  const navigateToCreateWalletPage = () => {
    openPage(PAGE_TYPES.CREATE_WALLET);
  };

  const navigateToImportPrivateKeyPage = () => {
    openPage(PAGE_TYPES.IMPORT_PRIVATE_KEY);
  };

  const navigateToSendAmountPage = (walletType, publicKey) => {
    setSelectedWallet({
      type: walletType,
      publicKey
    })
    openPage(PAGE_TYPES.SEND_AMOUNT_PAGE);
  }

  const navigateToNone = () => {
    openPage(PAGE_TYPES.NONE);
  };

  return {
    page,
    navigateToCreateWalletPage,
    navigateToImportPrivateKeyPage,
    navigateToSendAmountPage,
    navigateToNone
  };
};
