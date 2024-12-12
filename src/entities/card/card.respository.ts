import {
  changeCardStatus,
  createCard,
  deleteCard,
  getBalance,
  getBonusExpectation,
  getCards,
} from '@/shared/api/entities/card/card.api';
import {
  CardBonusExceptationDto,
  CardCreateDto,
  CardGetPaginationParams,
} from '@/shared/api/entities/card/types/req.type';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardChangeStatusDto } from './../../shared/api/entities/card/types/req.type';
import { useEffect } from 'react';
import { Inform } from '@/shared/service/log/log.service';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const cardsKey = ['cards'];

export function useGetCards(params?: CardGetPaginationParams) {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: cardsKey,
    queryFn: () => getCards(params),
    refetchOnWindowFocus: false,
  });

  return {
    refetch,
    data,
    isLoading,
    isFetching,
    isError,
  };
}

// export function useGetCardById(id: number) {
//   const {} = useQuery(())
// }

export function useCreateCard() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (card: CardCreateDto) => createCard(card),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardsKey });
    },
  });

  const createCardFunction = async (card: CardCreateDto) => {
    return await handleMutation(() => mutateAsync(card), FeedbackMessage.createdMessage('карта'));
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

  const deleteCardFn = async (id: number) => {
    return await handleMutation(() => mutateAsync(id), FeedbackMessage.deleteMessage('карта'));
  };

  return {
    deleteCardFn,
    isPending,
    isSuccess,
    isError,
  };
}

export type UpdateCardStatusParams = { cardId: number; cardChangeStatus: CardChangeStatusDto };
export function useUpdateCardStatus(params?: CardGetPaginationParams) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationKey: cardsKey,
    mutationFn: ({ cardId, cardChangeStatus }: UpdateCardStatusParams) => changeCardStatus(cardId, cardChangeStatus),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: cardsKey,
      });
    },
  });

  const changeCardStatusFn = async (data: UpdateCardStatusParams) => {
    await handleMutation(() => mutateAsync(data), FeedbackMessage.updatedMessage('карта'));
  };

  return { changeCardStatusFn, isPending, isSuccess, isError };
}

export function useGetCardBalance(cardId: number) {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['balance', cardId],
    queryFn: () => getBalance(cardId),
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  return {
    data,
    error,
    isLoading,
    isFetching,
  };
}

export function useGetBonusExpectation(id?: number, params?: CardBonusExceptationDto) {
  const debouncedPrice = useDebounce(params?.price, 500);
  const debouncedBonuses = useDebounce(params?.bonuses, 500); // Add debounce with 500ms delay

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: [...cardsKey, debouncedPrice, debouncedBonuses],

    queryFn: () =>
      id &&
      params &&
      debouncedPrice !== undefined &&
      debouncedBonuses !== undefined &&
      params.price > 0 &&
      params.bonuses >= 0
        ? getBonusExpectation(id, { ...params, price: debouncedPrice, bonuses: debouncedBonuses })
        : Promise.resolve(null),
  });

  useEffect(() => {
    if (error) {
      Inform.error(error);
    }
  }, [error]);

  const isBonusSpendingEnabled = debouncedPrice !== undefined && debouncedPrice > 0;

  return {
    data,
    error,
    isLoading,
    isFetching,
    isBonusSpendingEnabled,
  };
}
