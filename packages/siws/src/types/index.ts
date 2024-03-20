export interface QuyxSIWSProps {
  domain?: string;
  address: string;
  nonce: string;
  statement?: string;
  chainId: "devnet" | "mainnet" | "testnet";
  issuedAt: string;
  expirationTime: string;
}
