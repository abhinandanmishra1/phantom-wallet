import { useMutation, useQuery } from "react-query";

import { WALLET_TYPES } from "../constants";
import { useEthereumConnection } from "./useEthereumConnection";

export const useEthereumGetBalance = (publicKey, type = WALLET_TYPES.ETHEREUM) => {
  const { connection } = useEthereumConnection();

  return useQuery({
    queryKey: ["balance", publicKey],
    queryFn: async () => {
      const balanceInEth = await connection.getBalance(publicKey);
      return balanceInEth;
    },
    enabled: !!publicKey && type === WALLET_TYPES.ETHEREUM,
  });
};

export const useSendEthereumMutation = (toggleSidebar) => {
  const { connection } = useEthereumConnection();

  return useMutation({
    mutationFn: async ({ publicKey: receiverPublicKey, amount: eth }) => {
      await connection.transferEth(receiverPublicKey, eth);
    },
    onSuccess: () => {
      alert("Transaction successful!");
      toggleSidebar();
    },
    onError: () => {
      alert("Transaction failed.");
    },
  });
};
