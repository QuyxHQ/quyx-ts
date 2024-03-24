import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

function useWallet() {
  const { wallets, wallet } = useSolanaWallet();

  return {
    wallets,
    wallet,
  };
}

export default useWallet;
