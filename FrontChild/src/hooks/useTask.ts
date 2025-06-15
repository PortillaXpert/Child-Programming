import { api } from "../services/endpoints";
import { keys } from "../utils/storage";
import useSWR, { type SWRResponse } from "swr";

// TODO: Validate if this interface have the same parameters that the API returns
interface Task {
  id: string;
  title: string;
  description?: string;
}

interface TaskError {
  message: string;
  code?: string;
}

export const useTask = () => {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }: SWRResponse<Task[], TaskError> = useSWR<Task[], TaskError>(
    keys.task,
    api.getTask,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  return {
    error,
    isLoading,
    isValidating,
    task: data,
    mutate,
  };
};
