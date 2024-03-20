import bs58 from "bs58";
import nacl from "tweetnacl";
import { QuyxSIWSProps } from "../types";
import { dateUTC } from "../utils/helper";

export interface QuyxSIWS {
  prepare(): Uint8Array;
  validate(signature: Uint8Array): boolean;
}

export class QuyxSIWS implements QuyxSIWS {
  private domain: any;
  private address: any;
  private nonce: any;
  private statement: any;
  private chainId: any;
  private issuedAt: any;
  private expirationTime: any;

  constructor(props: QuyxSIWSProps) {
    this.domain = props.domain || new URL(window.location.href).host;
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
    const msg = `${this.domain}${this.statement}\n\nNonce: ${this.nonce}\nChain ID: ${this.chainId}\nIssued At: ${this.issuedAt}\nExpiration Time: ${this.expirationTime}`;
    return new TextEncoder().encode(msg);
  }

  validate(signature: Uint8Array) {
    const msg = this.prepare();
    const pubKeyUint8 = bs58.decode(this.address);

    const UTC_now = dateUTC().getTime();
    const UTC_issuedAt = dateUTC(this.issuedAt).getTime();
    const UTC_expirationTime = dateUTC(this.expirationTime).getTime();

    if (UTC_now < UTC_issuedAt) throw new Error("issuedAt is in future");
    if (UTC_now >= UTC_expirationTime) throw new Error("expired! request a new message");

    return nacl.sign.detached.verify(msg, signature, pubKeyUint8);
  }
}
