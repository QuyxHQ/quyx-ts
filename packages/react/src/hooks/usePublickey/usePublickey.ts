import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

function usePublickey() {
  const { publicKey } = useSolanaWallet();

  return publicKey || undefined;
}

export default usePublickey;
