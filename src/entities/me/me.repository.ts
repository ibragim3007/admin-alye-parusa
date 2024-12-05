import { getMe } from '@/shared/api/entities/me/me.api';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    retry: false,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
