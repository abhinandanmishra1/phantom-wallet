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

export const useSendEthereumMutation = () => {
  const { connection } = useEthereumConnection();

  return useMutation({
    mutationFn: async ({ publicKey: receiverPublicKey, amount: eth }) => {
      console.log("INSIDE MUTATION", receiverPublicKey, eth);
      await connection.transferEth(receiverPublicKey, eth);
    },
    onSuccess: () => {
      alert("Transaction successful!");
    },
    onError: () => {
      alert("Transaction failed.");
    },
  });
};
