import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { createClient, getClientById, getClients, updateClient } from '@/shared/api/entities/client/client.api';
import { ClientCreateParams } from '@/shared/api/entities/client/types/req.type';
import { Inform } from '@/shared/service/log/log.service';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
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

export const useCreateClient = (params?: CardGetPaginationParams) => {
  const queryClient = useQueryClient();
  const s = queryClient.getQueryData(['cards']);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (params: CreateClientParams) => createClient(params.clientCreateParams, params.body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['client'] });
    },
    // onSuccess: (createdClient) => {
    //   console.log(s);
    //   queryClient.setQueryData(
    //     [...cardsKey, params?.page, params?.sortOrder, params?.searchString],
    //     (oldData: CardsGetPaginationDto | undefined) => {
    //       console.log(params);
    //       console.log(oldData, createdClient);
    //       if (!oldData) return;

    //       const updatedCards = oldData.cards.map((card) =>
    //         card.clientId === createdClient.id ? { ...card, client: { ...createdClient } } : card
    //       );

    //       return { ...oldData, cards: updatedCards };
    //     }
    //   );

    //   void queryClient.invalidateQueries({ queryKey: ['client'] });
    // },
  });

  const createClientFn = async (params: CreateClientParams) => {
    await handleMutation(() => mutateAsync(params), FeedbackMessage.createdMessage('клиент'));
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

export const useUpdateClient = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (params: UpdateClientParams) => updateClient(params.id, params.body),
  });

  const updateClientFn = async (params: UpdateClientParams) => {
    const res = await handleMutation(() => mutateAsync(params), FeedbackMessage.updatedMessage('клиент'));
    return res;
  };

  return {
    updateClientFn,
    isPending,
    isError,
    error,
  };
};

export const useGetClientById = (id?: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['client', id],
    queryFn: () => (id ? getClientById(id) : Promise.resolve(null)),
    enabled: !!id, // Запрос выполняется только если есть id
  });

  return {
    data,
    isLoading,
    isError,
  };
};
