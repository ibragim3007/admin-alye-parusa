import { queryClient } from '@/shared/api/api';
import { createCard, deleteCard, getCards } from '@/shared/api/entities/card/card.api';
import { CardCreateDto } from '@/shared/api/entities/card/types/req.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { BasicErrorType } from '@/shared/utils/axiosErrorHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { Axios, AxiosError, isAxiosError } from 'axios';

const cardsKey = ['cards'];

export function useGetCards() {
  const { data, isLoading, isError } = useQuery({ queryKey: cardsKey, queryFn: getCards });

  return {
    data,
    isLoading,
    isError,
  };
}

export function useCreateCard() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (card: CardCreateDto) => createCard(card),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardsKey });
    },
  });

  const createCardFunction = async (card: CardCreateDto) => {
    try {
      const res = await mutateAsync(card);
      if (res) Inform.success(FeedbackMessage.createdMessage('карта'));
    } catch (e) {
      Inform.error(e);
    }
  };

  return {
    createCardFunction,
    isPending,
    isSuccess,
    isError,
  };
}

export function useDeleteCard() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardsKey });
    },
  });

  return {
    mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
}
