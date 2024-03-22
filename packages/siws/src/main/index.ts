import bs58 from "bs58";
import nacl from "tweetnacl";

export interface QuyxSIWSInterface {
  prepare(): Uint8Array;
  validate(signature: Uint8Array): boolean;
}

export function signatureToString(signature: Uint8Array) {
  return bs58.encode(signature);
}

type Props = {
  domain: string;
  address: string;
  nonce: string;
  statement?: string;
  chainId: string;
  issuedAt: string;
  expirationTime: string;
};

export class QuyxSIWS implements QuyxSIWSInterface {
  domain: any;
  address: any;
  nonce: any;
  statement: any;
  chainId: any;
  issuedAt: any;
  expirationTime: any;

  constructor(props: Props) {
    this.domain = props.domain;
    this.address = props.address;
    this.nonce = props.nonce;
    this.statement =
      props.statement ||
      `Clicking Confirm or Sign only means you have approved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee`;
    this.chainId = props.chainId;
    this.issuedAt = props.issuedAt;
    this.expirationTime = props.expirationTime;
  }

  prepare() {
    const msg = `${this.domain}\n\n${this.statement}\n\nNonce: ${this.nonce}\nChain ID: ${this.chainId}\nIssued At: ${this.issuedAt}\nExpiration Time: ${this.expirationTime}`;
    return new TextEncoder().encode(msg);
  }

  validate(signature: Uint8Array) {
    const msg = this.prepare();
    const pubKeyUint8 = bs58.decode(this.address);

    return nacl.sign.detached.verify(msg, signature, pubKeyUint8);
  }
}
