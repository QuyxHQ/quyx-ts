<p align="center">
<br />
<img src="https://github.com/QuyxHQ/quyx-ts/blob/main/assets/logo.svg?raw=true" width="200" alt="Quyx"/>
<br />
</p>

<h1 align="center">Quyx TypeScript Fetch</h1>

## Installation

Install the latest version with `npm`:

```sh
npm install @quyx/fetch
```

or with `yarn`:

```sh
yarn add @quyx/fetch
```

<br />

## Getting Started

### 1. Instantiate the class

```typescript title="index.ts"
// index.ts
import { Quyx } from "@quyx/fetch";
import dotenv from "dotenv";

dotenv.config();

/**
 * Props: {
 *  apiKey?:  string;
 *  clientId?:  string;
 *  accessToken?:  string;
 *  refreshToken?:  string;
 * }
 * apiKey - Quyx apiKey can be gotten from https://dev.quyx.xyz
 * clientId - Quyx clientId can be gotten from https://dev.quyx.xyz
 * accessToken & refreshToken - To store info about the user, always gotten after calling the 'login' method
 **/
const quyx = new Quyx({ apiKey: process.env.QUYX_API_KEY });
```

### 2. Methods on the class

| Method                         | Description                                                                                                                                   | Props              | Response                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------- |
| init                           | prepares the SIWE (Sign In With Ethereum) message to be signed by an EOA (Externally Owned Account), to prove ownership before gaining access | `QuyxInitProps `   | `SiweMessage`                           |
| siwe                           | checks and ensures that the wallet connected is the signer of the initialized message                                                         | `QuyxSIWEProps `   | ` QuyxResponse<TokensProps>`            |
| whoami <br/> _(protected)_     | gets the info of the current logged in user                                                                                                   | --                 | `QuyxResponse<QuyxSDKUser>`             |
| cards <br/> _(protected)_      | gets all the cards of the current logged in user                                                                                              | `PagingProps`      | `QuyxPaginationResponse<QuyxCard[]>`    |
| import <br/> _(protected)_     | updates the card imported by the user (i.e. the user preferred card)                                                                          | `{_id:string}`     | `QuyxResponse<undefined>`               |
| findUser                       | gets the info of a user on your Quyx app from their address                                                                                   | `{address:string}` | `QuyxResponse<QuyxSDKUser>>`            |
| allUsers                       | returns all the users registered on your app                                                                                                  | `PagingProps`      | `QuyxPaginationResponse<QuyxSDKUser[]>` |
| disconnect <br/> _(protected)_ | \*be carefully when calling this method as it will delete the user account off your app                                                       | --                 | `QuyxResponse<undefined>`               |
| logout <br/> _(protected)_     | destroys the current session of the user                                                                                                      | --                 | `QuyxResponse<undefined>`               |

<font color="dodgerblue">**💡 NOTE:**</font> for routes with the **protected** badge, the user `accessToken` and `refreshToken` must be passed when creating an instance of the class for this to work

### 3. Code Examples

```typescript title="index.ts"
// index.ts
import { Quyx } from "@quyx/fetch";
import dotenv from "dotenv";
import { SiweMessage } from "siwe";

dotenv.config();
const apiKey = process.env.QUYX_API_KEY;

/**
 * Props: {
 *  apiKey?:  string;
 *  clientId?:  string;
 *  accessToken?:  string;
 *  refreshToken?:  string;
 * }
 * apiKey - Quyx apiKey can be gotten from https://dev.quyx.xyz
 * clientId - Quyx clientId can be gotten from https://dev.quyx.xyz
 * accessToken & refreshToken - To store info about the user, always gotten after calling the 'login' method
 **/
const quyx = new Quyx({ apiKey });

// init
quyx
  .init({ address: "0x...", chainId: 1 })
  .then((e) => console.log(e))
  .catch((e) => console.error(e));

// siwe
quyx
  .siwe({ address: "0x...", message: new SiweMessage({}), signature: "0x..." })
  .then((e) => console.log(e))
  .catch((e) => console.error(e));

// gotten after calling siwe
let accessToken = "ACCESS_TOKEN_HERE";
let refreshToken = "REFRESH_TOKEN_HERE";

const quyxWithAuth = new Quyx({ apiKey, accessToken, refreshToken });

// whoami
quyx
  .whoami()
  .then((e) => console.log(e))
  .catch((e) => console.error(e));

// .....other methods (refer to documentation for more implemetations)
```

To run code run this in terminal:

```sh
ts-node index.ts
```

Ensure you have `ts-node` installed globally inorder for this to work, to install `ts-node` globally run

```sh
npm i -g ts-node
```
