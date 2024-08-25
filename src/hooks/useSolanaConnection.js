import { useMemo, useRef } from "react";

import { SolanaConnection } from "../apis";
import { useCurrentAccount } from "./useCurrentAccount";

export const useSolanaConnection = () => {
  const {
    SOLANA: { publicKey, privateKey },
  } = useCurrentAccount();

  const previousKeysRef = useRef({ publicKey: null, privateKey: null });

  const connection = useMemo(() => {
    if (
      publicKey !== previousKeysRef.current.publicKey ||
      privateKey !== previousKeysRef.current.privateKey
    ) {
      previousKeysRef.current = { publicKey, privateKey };

      return new SolanaConnection(publicKey, privateKey);
    }

    return previousKeysRef.current.connection;
  }, [publicKey, privateKey]);

  previousKeysRef.current.connection = connection;

  return {
    connection,
  };
};
