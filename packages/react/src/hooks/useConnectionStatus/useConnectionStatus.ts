import { useQuyxProvider } from "../../providers/QuyxProvider";

function useConnectionStatus() {
  const { connectionStatus } = useQuyxProvider();
  return connectionStatus;
}

export default useConnectionStatus;
