import React, { createContext, useContext, useMemo, useState } from "react";
import { ConnectionStatus, QuyxProviderProps } from "../types";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import ThemeProvider from "./ThemeProvider";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import HelperProvider from "./HelperProvider";
import ModalProvider from "./ModalProvider";
import { Toaster } from "react-hot-toast";

type QuyxProviderContextProps = {
  cluster?: Cluster;
  clientId?: string;
  filterSpam: boolean;
  refreshAppInfoAfter: number;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (value: ConnectionStatus) => void;
};

const QuyxProviderContext = createContext<QuyxProviderContextProps>({
  refreshAppInfoAfter: 3600,
  connectionStatus: "unknown",
  filterSpam: false,
  setConnectionStatus() {},
});

export const useQuyxProvider = () => useContext(QuyxProviderContext);

const QuyxProvider: React.FC<QuyxProviderProps> = ({
  children,
  clientId,
  cluster,
  supportedWallets,
  autoConnect = true,
  theme,
  toastPosition = "bottom-center",
  refreshAppInfoAfter = 24 * 60 * 60 * 1000, // 24 hours
  filterSpam = false,
}) => {
  const wallets = useMemo(() => supportedWallets, [supportedWallets]);
  const endpoint = useMemo(() => clusterApiUrl(cluster), [cluster]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("unknown");

  return (
    <QuyxProviderContext.Provider
      value={{
        clientId,
        cluster,
        refreshAppInfoAfter,
        connectionStatus,
        filterSpam,
        setConnectionStatus,
      }}
    >
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={autoConnect}>
          <HelperProvider>
            <ThemeProvider theme={theme}>
              <ModalProvider>
                <React.Fragment>
                  <Toaster position={toastPosition} reverseOrder={false} />
                  {children}
                </React.Fragment>
              </ModalProvider>
            </ThemeProvider>
          </HelperProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QuyxProviderContext.Provider>
  );
};

export default QuyxProvider;
