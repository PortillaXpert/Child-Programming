import useSWR, { type SWRResponse } from "swr";
import { keys } from "../utils/storage";
import { api } from "../services/endpoints";

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthError {
  message: string;
  code?: string;
}

export const useAuth = () => {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }: SWRResponse<User, AuthError> = useSWR<User, AuthError>(
    keys.auth,
    api.getAuth,
  );

  return {
    user: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
