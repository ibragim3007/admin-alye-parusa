import {
  changeTour,
  changeTourState,
  createTour,
  deleteTour,
  getTours,
  getToursByClientId,
} from '@/shared/api/entities/tour/tour.api';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { TourClientGetDto, TourClientQueryParamsDto } from '@/shared/api/entities/tour/types/res.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IChangeTourState } from './types';

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
export const useGetTourByClientId = (clientId: number, params?: TourClientQueryParamsDto) => {
  const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
    queryKey: [...toursByClientKey, clientId],
    queryFn: () => getToursByClientId(clientId, params),
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
    isFetching,
    isLoading,
    error,
    isError,
  };
};

export const useCreateTour = (cardId: number, clientId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: TourCreateDto) => createTour(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...toursByClientKey, clientId] });
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  const createTourFn = async (data: TourCreateDto) => {
    return await handleMutation(() => mutateAsync(data), FeedbackMessage.createdMessage('тур'));
  };

  return {
    createTourFn,
    isPending,
    error,
  };
};

type TChangeStateTourParams = {
  id: number;
  tourState: IChangeTourState;
};
export const useChangeStateTour = (clientId: number, cardId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: TChangeStateTourParams) => changeTourState(data.id, data.tourState),
    onSuccess: (data, variables) => {
      // Обновляем локальный кэш

      void queryClient.invalidateQueries({ queryKey: ['balance'] });
      void queryClient.invalidateQueries({ queryKey: toursByClientKey });

      queryClient.setQueryData<TourClientGetDto>([...toursByClientKey, clientId], (cachedData) => {
        console.log(cachedData);
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

type UpdateTourParams = { id: number; data: TourCreateDto };

export function useUpdateTour() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: toursByClientKey,
    mutationFn: (params: UpdateTourParams) => changeTour(params.id, params.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: toursByClientKey });
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  const updateTourFn = async (params: UpdateTourParams) => {
    return await handleMutation(() => mutateAsync(params), FeedbackMessage.updatedMessage('тур'));
  };

  return {
    updateTourFn,
    isPending,
    error,
  };
}

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: toursByClientKey,
    mutationFn: (id: number) => deleteTour(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
      void queryClient.invalidateQueries({ queryKey: [...toursByClientKey] });
    },
  });

  const deleteTourFn = async (id: number) => {
    return await handleMutation(() => mutateAsync(id), FeedbackMessage.deleteMessage('тур'));
  };

  return {
    deleteTourFn,
    isPending,
  };
}
