import { useHelperProvider } from "../../providers/HelperProvider";

function useApp() {
  const { app, isLoadingAppInfo } = useHelperProvider();

  return {
    app,
    isLoading: isLoadingAppInfo,
  };
}

export default useApp;
