import { api } from '../services/endpoints'
import { keys } from '../utils/storage'
import useSWR from 'swr'

export const useTask = () => {
  const key = { url: keys.task }

  const { data, error, isLoading, isValidating, mutate } = useSWR(key, api.getTask, {
    revalidateOnFocus: false,
    revalidateIfStale: false
  })

  return {
    error,
    isLoading,
    isValidating,
    task: data,
    mutate
  }
}
