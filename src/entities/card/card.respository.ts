import { changeCardStatus, createCard, deleteCard, getCards } from '@/shared/api/entities/card/card.api';
import { CardCreateDto, CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { CardsGetPaginationDto } from '@/shared/api/entities/card/types/res.type';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardChangeStatusDto } from './../../shared/api/entities/card/types/req.type';
import { ICard } from './types';

const cardsKey = ['cards'];

export function useGetCards(params?: CardGetPaginationParams) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [...cardsKey, params?.page],
    queryFn: () => getCards(params),
  });

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
    await handleMutation(() => mutateAsync(card), FeedbackMessage.createdMessage('карта'));
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

export type UpdateCardStatusParams = { cardId: number; cardChangeStatus: CardChangeStatusDto };
export function useUpdateCardStatus() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ cardId, cardChangeStatus }: UpdateCardStatusParams) => changeCardStatus(cardId, cardChangeStatus),
    onSuccess: (updatedCard) => {
      queryClient.setQueryData(cardsKey, (oldCards: CardsGetPaginationDto | undefined) => {
        if (!oldCards) return [];

        const updatedCache = {
          ...oldCards,
          cards: oldCards.cards.map((card: ICard) => (card.id === updatedCard.id ? { ...card, ...updatedCard } : card)),
        };

        return updatedCache;
      });
    },
  });

  const changeCardStatusFn = async (data: UpdateCardStatusParams) => {
    await handleMutation(() => mutateAsync(data), FeedbackMessage.updatedMessage('карта'));
  };

  return { changeCardStatusFn, isPending, isSuccess, isError };
}
