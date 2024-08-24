import { PAGE_TYPES } from "../constants";
import { useStore } from "../store";

export const useNavigateToPages = () => {
  const { page, openPage } = useStore();
  const navigateToCreateWalletPage = () => {
    openPage(PAGE_TYPES.CREATE_WALLET);
  };

  const navigateToImportPrivateKeyPage = () => {
    openPage(PAGE_TYPES.IMPORT_PRIVATE_KEY);
  };

  console.log(page)
  const navigateToNone = () => {
    openPage(PAGE_TYPES.NONE);
  };

  return {
    page,
    navigateToCreateWalletPage,
    navigateToImportPrivateKeyPage,
    navigateToNone
  };
};
