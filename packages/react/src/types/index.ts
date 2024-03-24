import React from "react";
import { Cluster } from "@solana/web3.js";
import { Adapter } from "@solana/wallet-adapter-base";
import { ToastPosition } from "react-hot-toast";

export type Theme = "light" | "dark";

export type ConnectionStatus =
  | "unknown"
  | "connecting"
  | "connected"
  | "authenticated"
  | "disconnecting"
  | "disconnected"
  | "onboarded";

export type QuyxProviderProps = {
  children: React.JSX.Element;
  clientId: string;
  cluster: Cluster;
  supportedWallets: Adapter[];
  theme?: Theme;
  autoConnect?: boolean;
  refreshAppInfoAfter?: number;
  toastPosition?: ToastPosition;
  filterSpam?: boolean;
};
