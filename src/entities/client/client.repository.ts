import { createClient, getClientById, getClients } from '@/shared/api/entities/client/client.api';
import { Inform } from '@/shared/service/log/log.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IClientCreate } from './types';
import { ClientCreateParams } from '@/shared/api/entities/client/types/req.type';
import { FeedbackMessage } from '@/shared/service/log/message.service';
import { handleMutation } from '@/shared/utils/handleMutation';

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
export const useCreateClient = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: CreateClientParams) => createClient(params.clientCreateParams, params.body),
  });

  const createClientFn = async (params: CreateClientParams) => {
    await handleMutation(() => mutateAsync(params), FeedbackMessage.createdMessage('клиент'));
  };

  return {
    createClientFn,
    isPending,
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
