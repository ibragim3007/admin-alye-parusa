import { useUpdateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { BasicErrorType, isAxiosError } from '@/shared/utils/axiosErrorHandler';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../types';

export function useEditClientForm(
  formApi: UseFormReturn<IClientCreate, any, undefined>,
  updateFormStatus: (formStatus: formStatuses) => void
) {
  const { updateClientFn, isPending: loadingUpdateClient, error: editError } = useUpdateClient();
  const onClickEditButton = async (id: number, clientData: IClientCreate) => {
    const res = await updateClientFn({ id: id, body: clientData });
    if (res) updateFormStatus('frozen');
  };

  useEffect(() => {
    if (isAxiosError<BasicErrorType>(editError)) {
      if (editError.response?.data) {
        const { errors } = editError.response.data;

        Object.entries(errors).forEach(([field, messages]) => {
          formApi.setError(field as keyof IClientCreate, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(' ') : messages,
          });
        });
      }
    }
  }, [editError, formApi]);

  return {
    onClickEditButton,
    loadingUpdateClient,
  };
}
