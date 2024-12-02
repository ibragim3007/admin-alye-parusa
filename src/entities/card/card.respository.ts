import { createCard, deleteCard, getCards } from '@/shared/api/entities/card/card.api';
import { CardCreateDto } from '@/shared/api/entities/card/types/req.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (card: CardCreateDto) => createCard(card),
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
  };
}

export function useDeleteCard() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cardsKey });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
  };
}
