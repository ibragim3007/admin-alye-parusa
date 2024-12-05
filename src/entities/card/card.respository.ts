import { changeCardStatus, createCard, deleteCard, getCards } from '@/shared/api/entities/card/card.api';
import { CardCreateDto, CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardChangeStatusDto } from './../../shared/api/entities/card/types/req.type';

const cardsKey = ['cards'];

export function useGetCards(params?: CardGetPaginationParams) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [...cardsKey, params?.page, params?.searchString, params?.sortOrder],
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

  const deleteCardFn = async (id: number) => {
    await handleMutation(() => mutateAsync(id), FeedbackMessage.deleteMessage('карта'));
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
    mutationKey: [...cardsKey],
    mutationFn: ({ cardId, cardChangeStatus }: UpdateCardStatusParams) => changeCardStatus(cardId, cardChangeStatus),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...cardsKey, params?.page, params?.searchString] });
    },
    // onSuccess: (updatedCard) => {
    //   console.log(updatedCard);
    //   queryClient.setQueryData(
    //     [[...cardsKey, params?.page, params?.searchString]],
    //     (oldCards: CardsGetPaginationDto | undefined) => {
    //       console.log(oldCards);
    //       if (!oldCards) return [];

    //       const updatedCache = {
    //         ...oldCards,
    //         cards: oldCards.cards.map((card: ICard) =>
    //           card.id === updatedCard.id ? { ...card, ...updatedCard } : card
    //         ),
    //       };

    //       return updatedCache;
    //     }
    //   );
    // },
  });

  const changeCardStatusFn = async (data: UpdateCardStatusParams) => {
    await handleMutation(() => mutateAsync(data), FeedbackMessage.updatedMessage('карта'));
  };

  return { changeCardStatusFn, isPending, isSuccess, isError };
}
