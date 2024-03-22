import { QuyxInterface } from "@quyx/fetch";

declare global {
  namespace Express {
    interface Request {
      quyx: InjectedQuyx;
    }
  }
}

export type InjectedQuyx = QuyxInterface;
