import { useMutation, useQuery } from "react-query"

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useSolanaConnection } from "./useSolanaConnection";

export const useSolanaGetBalance = (publicKeyBase58) => {
    const {connection} = useSolanaConnection();

    return useQuery({
        queryKey: ["balance", publicKeyBase58],
        queryFn: async () => {
            const data = await connection.getBalance(publicKeyBase58);

            const balanceInLamports = data.result.value;
            const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
            return balanceInSol;
        },
    })
}

export const useSendSolanaMutation = () => {
    const { connection } = useSolanaConnection();

    return useMutation({
        mutationFn: async ({ publicKey:receiverPublicKey, amount:sols }) => {
            console.log("INSIDE MUTATION",receiverPublicKey, sols)
            await connection.transferSol(receiverPublicKey, sols);
        },
        onSuccess: () => {
            alert("success")
        },
        onError: () => {
            alert("error")
        }
    })
}