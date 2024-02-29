import { Request, Response, NextFunction } from "express";
import session from "express-session";
import { injectQuyx } from "../utils/helpers";

function sessionMiddleware(options?: session.SessionOptions & { secret: string }) {
  return session({
    secret: "__QUYX__DEFAULT_SECRET",
    ...(options || {}),
    resave: false,
    saveUninitialized: true,
  });
}

function initQuyx({ apiKey }: { apiKey: string }) {
  return async function (req: Request, _: Response, next: NextFunction) {
    req.quyx = injectQuyx({ apiKey, req });

    return next();
  };
}

export { sessionMiddleware, initQuyx };
