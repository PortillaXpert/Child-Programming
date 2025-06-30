import { keys } from '../utils/storage'
import { api } from '../services/endpoints'
import useSWR from 'swr'

export const useAuth = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(keys.auth, api.getAuth)

  return {
    user: data,
    error,
    isLoading,
    isValidating,
    mutate
  }
}
