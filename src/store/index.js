import { PAGE_TYPES, WALLET_TYPES } from "../constants";

import { create } from "zustand";

export const useStore = create((set) => ({
  page: PAGE_TYPES.NONE,
  walletType: WALLET_TYPES.SOLANA,
  setWalletType: (walletType) => set({ walletType }),
  openPage: (page) => set(() => ({ page })),
  mainSidebarOpen: false,
  toggleMainSidebar: () =>
    set((state) => ({ mainSidebarOpen: !state.mainSidebarOpen })),
  bottomSidebarOpen: false,
  toggleBottomSidebar: () =>
    set((state) => ({ bottomSidebarOpen: !state.bottomSidebarOpen })),
  rightSidebarOpen: false,
  toggleRightSidebar: () =>
    set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
}));
