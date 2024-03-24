export const PREFIX = "__QX__";

export const APP_URL = "https://quyx.xyz";

export const SiginPriviledges = [
  {
    isValid: true,
    message: "Verifies ownership of wallet",
  },
  {
    isValid: true,
    message: "Connects you to your Quyx account",
  },
  {
    isValid: false,
    message: "Trigger a blockchain request",
  },
  {
    isValid: false,
    message: "Transfer funds without your permission",
  },
];
