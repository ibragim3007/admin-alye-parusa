import { formStatuses } from '@/features/clientForm/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { CardsGetPaginationDto } from '@/shared/api/entities/card/types/res.type';
import { createClient, getClientById, getClients, updateClient } from '@/shared/api/entities/client/client.api';
import { ClientCreateParams } from '@/shared/api/entities/client/types/req.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { cardsKey } from '../card/card.respository';
import { IClientCreate } from './types';

const clientKeys = ['client'];

export const useGetClients = () => {
  const { data, isLoading, isError, error } = useQuery({ queryKey: clientKeys, queryFn: getClients });

  useEffect(() => {
    Inform.error(error);
  }, [error, isError]);

  return {
    data,
    isLoading,
    isError,
  };
};

export type CreateClientParams = {
  clientCreateParams: ClientCreateParams;
  body: IClientCreate;
};

export const useCreateClient = (cardId: string, params?: CardGetPaginationParams) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (params: CreateClientParams) => createClient(params.clientCreateParams, params.body),
    onSuccess: (createdClient) => {
      queryClient.setQueryData(cardsKey, (cardsPagination: CardsGetPaginationDto | undefined) => {
        if (!cardsPagination) return;

        const updatedCards = cardsPagination.cards.map((card) =>
          card.id === Number(cardId) ? { ...card, shortName: createdClient.surname, clientId: createdClient.id } : card
        );

        const cardsPaginatiomUpdated = { ...cardsPagination, cards: updatedCards };

        return cardsPaginatiomUpdated;
      });
    },
  });

  const createClientFn = async (params: CreateClientParams) => {
    const res = await handleMutation(() => mutateAsync(params), FeedbackMessage.createdMessage('клиент'), {
      disableError: true,
    });

    return res;
  };

  return {
    error,
    createClientFn,
    isPending,
  };
};

export type UpdateClientParams = {
  id: number;
  body: IClientCreate;
};

export const useUpdateClient = (cardId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (params: UpdateClientParams) => updateClient(params.id, params.body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const updateClientFn = async (params: UpdateClientParams) => {
    const res = await handleMutation(() => mutateAsync(params), FeedbackMessage.updatedMessage('клиент'), {
      disableError: true,
    });
    return res;
  };

  return {
    updateClientFn,
    isPending,
    isError,
    error,
  };
};

export const useGetClientById = (idCard?: number, formStatus?: formStatuses) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['client', idCard],
    queryFn: () => (idCard ? getClientById(idCard) : Promise.resolve(null)),
    enabled: !!idCard, // Запрос выполняется только если есть id
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};
