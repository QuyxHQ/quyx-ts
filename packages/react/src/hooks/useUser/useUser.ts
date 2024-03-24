import { useHelperProvider } from "../../providers/HelperProvider";

function useUser() {
  const { user, isLoadingUserInfo } = useHelperProvider();

  return {
    user,
    isLoading: isLoadingUserInfo,
  };
}

export default useUser;
