import { changeCardStatus, createCard, deleteCard, getCards } from '@/shared/api/entities/card/card.api';
import { CardCreateDto } from '@/shared/api/entities/card/types/req.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardChangeStatusDto } from './../../shared/api/entities/card/types/req.type';
import { ICard } from './types';

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
      console.log(e);
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

export type UpdateCardStatusParams = { cardId: number; cardChangeStatus: CardChangeStatusDto };
export function useUpdateCardStatus() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: ({ cardId, cardChangeStatus }: UpdateCardStatusParams) => changeCardStatus(cardId, cardChangeStatus),
    onSuccess: (updatedCard) => {
      queryClient.setQueryData(cardsKey, (oldCards: any[] | undefined) => {
        if (!oldCards) return [];

        return oldCards.map((card: ICard) => (card.id === updatedCard.id ? { ...card, ...updatedCard } : card));
      });
    },
  });

  const changeCardStatusFn = async (data: UpdateCardStatusParams) => {
    try {
      const res = await mutateAsync(data);
      if (res) Inform.success(FeedbackMessage.updatedMessage('карта'));
    } catch (e) {
      Inform.error(e);
    }
  };

  return { changeCardStatusFn, isPending, isSuccess, isError };
}
