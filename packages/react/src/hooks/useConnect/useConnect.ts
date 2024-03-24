import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

function useConnect() {
  const { connected, connecting, disconnect, disconnecting, select } = useSolanaWallet();

  const connect = (walletName: WalletName | null): void => {
    return select(walletName);
  };

  return {
    connect,
    isConnecting: connecting,
    connected,
    disconnect,
    isDisconnecting: disconnecting,
  };
}

export default useConnect;
