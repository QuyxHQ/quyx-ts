import { useHelperProvider } from "../../providers/HelperProvider";

function useBalance() {
  const { balance } = useHelperProvider();

  return balance;
}

export default useBalance;
