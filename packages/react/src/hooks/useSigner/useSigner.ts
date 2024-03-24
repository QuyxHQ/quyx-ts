import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

function useSigner() {
  const {
    sendTransaction,
    signAllTransactions,
    signMessage,
    signTransaction,
    signIn,
  } = useSolanaWallet();

  return {
    sendTransaction,
    signAllTransactions,
    signMessage,
    signTransaction,
    signIn,
  };
}

export default useSigner;
