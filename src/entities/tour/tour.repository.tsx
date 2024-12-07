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

export const useGetTourByClientId = (clientId: number) => {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ['tour-by-client'],
    queryFn: () => getToursByClientId(clientId),
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    isError,
  };
};

export const useCreateTour = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: tourKeys,
    mutationFn: (data: TourCreateDto) => createTour(data),
  });

  const createTourFn = async (data: TourCreateDto) => {
    await handleMutation(() => mutateAsync(data), FeedbackMessage.createdMessage('тур'));
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
    mutationKey: tourKeys,
    mutationFn: (data: TChangeStateTourParams) => changeTourState(data.id, data.tourState),
    onSuccess: (data, variables) => {
      data;
      // Обновляем локальный кэш
      queryClient.setQueryData<TourClientGetDto>(['tour-by-client'], (cachedData) => {
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
