import { customToast, TOAST_STATUS } from "../misc/customToast";

type truncateAddressProps = {
  address: string;
  suffixLength?: number;
  prefixLength?: number;
};

export function truncateAddress({
  address,
  prefixLength = 5,
  suffixLength = 4,
}: truncateAddressProps) {
  if (!address) return "null";

  if (address.length <= prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);
  const truncated = `${prefix}....${suffix}`;

  return truncated;
}

export async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);

      customToast({
        type: TOAST_STATUS.SUCCESS,
        message: "Copied to clipboard ✅",
      });
    } catch (e: any) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "Unable to copy to clipboard",
      });

      console.error("Unable to copy text to clipboard", e);
    }
  } else {
    customToast({
      type: TOAST_STATUS.ERROR,
      message: "Clipboard action not supported on device",
    });
  }
}
