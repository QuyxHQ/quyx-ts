import { usePublickey } from "..";

function useAddress() {
  const publicKey = usePublickey();

  return publicKey ? publicKey.toBase58() : undefined;
}

export default useAddress;
