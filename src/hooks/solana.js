import { useMutation, useQuery } from "react-query";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WALLET_TYPES } from "../constants";
import { useNavigateToPages } from "./useNavigateToPages";
import { useSolanaConnection } from "./useSolanaConnection";
import { useStore } from "../store";

export const useSolanaGetBalance = (publicKeyBase58, type = WALLET_TYPES.SOLANA) => {
  const { connection } = useSolanaConnection();

  return useQuery({
    queryKey: ["balance", publicKeyBase58],
    queryFn: async () => {
      const data = await connection.getBalance(publicKeyBase58);

      const balanceInLamports = data.result.value;
      const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
      return balanceInSol;
    },
    enabled: !!publicKeyBase58 && (!!type && type === WALLET_TYPES.SOLANA),
  });
};

export const useSendSolanaMutation = (toggleSidebar) => {
  const { connection } = useSolanaConnection();

  return useMutation({
    mutationFn: async ({ publicKey: receiverPublicKey, amount: sols }) => {
      await connection.transferSol(receiverPublicKey, sols);
    },
    onSuccess: () => {
      alert("success");
      toggleSidebar?.();
    },
    onError: () => {
      alert("error");
    },
  });
};
