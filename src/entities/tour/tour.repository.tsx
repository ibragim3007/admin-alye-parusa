import { changeTourState, createTour, getTours, getToursByClientId } from '@/shared/api/entities/tour/tour.api';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IChangeTourState } from './types';
import { TourClientGetDto } from '@/shared/api/entities/tour/types/res.type';

const tourKeys = ['tour'];

export const useGetTours = () => {
  const { data, isLoading, isError, error } = useQuery({ queryKey: tourKeys, queryFn: () => getTours() });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const toursByClientKey = ['tour-by-client'];
export const useGetTourByClientId = (clientId: number) => {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: toursByClientKey,
    queryFn: () => getToursByClientId(clientId),
    refetchOnMount: true,
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    refetch,
    data,
    isLoading: isLoading || isFetching,
    error,
    isError,
  };
};

export const useCreateTour = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: toursByClientKey,
    mutationFn: (data: TourCreateDto) => createTour(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: toursByClientKey });
    },
  });

  const createTourFn = async (data: TourCreateDto) => {
    return await handleMutation(() => mutateAsync(data), FeedbackMessage.createdMessage('тур'));
  };

  return {
    createTourFn,
    isPending,
  };
};

type TChangeStateTourParams = {
  id: number;
  tourState: IChangeTourState;
};
export const useChangeStateTour = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [...toursByClientKey],
    mutationFn: (data: TChangeStateTourParams) => changeTourState(data.id, data.tourState),
    onSuccess: (data, variables) => {
      // Обновляем локальный кэш

      void queryClient.invalidateQueries({ queryKey: ['balance'] });

      queryClient.setQueryData<TourClientGetDto>([...toursByClientKey], (cachedData) => {
        if (!cachedData) return undefined;

        // Обновляем состояние нужного тура
        return {
          ...cachedData,
          tours: cachedData.tours.map((tour) =>
            tour.id === variables.id ? { ...tour, state: variables.tourState.tourState } : tour
          ),
        };
      });
    },
  });

  const changeTourStateFn = async (data: TChangeStateTourParams) => {
    await handleMutation(() => mutateAsync(data), FeedbackMessage.updatedMessage('статус тура'));
  };

  return {
    changeTourStateFn,
    isPending,
  };
};

// export const useDeleteTour = () => {
//   const {} = useMutation({
//     mutationKey: tourKeys,
//     mutationFn: () =>
//   });
// };
