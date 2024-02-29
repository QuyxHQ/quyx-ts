<p align="center">
<br />
<img src="https://github.com/QuyxHQ/quyx-ts/blob/main/assets/logo.svg?raw=true" width="200" alt="Quyx"/>
<br />
</p>

<h1 align="center">Quyx TypeScript Express</h1>

## Installation

Install the latest version with `npm`:

```sh
npm install @quyx/express express @types/express
```

or with `yarn`:

```sh
yarn add @quyx/express express @types/express
```

Also install `ts-node` globally if you don't already have that installed, as it helps us run our code

```sh
npm  i  -g  ts-node
```

<br />

## Getting Started

This package injects quyx methods into express Request object so it can be easily called by trying something like: `req.quyx.method()`

### Add middlewares

Quyx relies on `express-session` to store users `accessToken` and `refreshToken`, so it has to be set first before then setting our middleware

#### 1. Session Middleware

```typescript title="index.ts"
import { sessionMiddleware } from "@quyx/express";
import express from "express";

// express app
const app = express();
// adding the session middleware
// for other props to be passed down to middleware please refer to the official documentatio of express-session
app.use(sessionMiddleware({ secret: "super_secret_stuff_here" }));

app
  .listen(8085, () => console.log("app listening at http://localhost:8085"))
  .on("error", (e) => {
    console.log("error", e);
    console.trace();
  });

export default app;
```

#### 2. Quyx Middleware

```typescript title="index.ts"
import { sessionMiddleware, initQuyx } from "@quyx/express";
import express from "express";

// express app
const app = express();
// adding the session middleware
// for other props to be passed down to middleware please refer to the official documentatio of express-session
app.use(sessionMiddleware({ secret: "super_secret_stuff_here" }));
// should always be set after setting the session middleware
// you are needed to pass your app apiKey and that can be gotten at https://dev.quyx.xyz
app.use(initQuyx({ apiKey: "QUYX_API_KEY_HERE" }));

app
  .listen(8085, () => console.log("app listening at http://localhost:8085"))
  .on("error", (e) => {
    console.log("error", e);
    console.trace();
  });

export default app;
```

#### 3. Code Examples

```typescript title="index.ts"
import { sessionMiddleware, initQuyx } from "@quyx/express";
import express, { Request, Response } from "express";

// express app
const app = express();
// adding the session middleware
// for other props to be passed down to middleware please refer to the official documentatio of express-session
app.use(sessionMiddleware({ secret: "super_secret_stuff_here" }));
// should always be set after setting the session middleware
// you are needed to pass your app apiKey and that can be gotten at https://dev.quyx.xyz
app.use(initQuyx({ apiKey: "QUYX_API_KEY_HERE" }));

app.post("/init", async (req: Request, res: Response) => {
  const resp = await req.quyx.init({
    address: req.body.address,
    chainId: req.body.chainId,
  });

  return res.json(resp);
});

// ....other methods works the same way

app
  .listen(8085, () => console.log("app listening at http://localhost:8085"))
  .on("error", (e) => {
    console.log("error", e);
    console.trace();
  });

export default app;
```

To run code run this in terminal:
`ts-node  index.ts`
