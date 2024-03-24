import { useQuyxProvider } from "../../providers/QuyxProvider";

function useCluster() {
  const { cluster } = useQuyxProvider();

  return cluster;
}

export default useCluster;
