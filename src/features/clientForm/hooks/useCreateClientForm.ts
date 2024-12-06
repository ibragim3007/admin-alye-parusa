import { useCreateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { BasicErrorType, isAxiosError } from '@/shared/utils/axiosErrorHandler';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../types';

export function useCreateClientForm(
  cardId: string,
  formApi: UseFormReturn<IClientCreate, any, undefined>,
  updateFormStatus: (formStatus: formStatuses) => void,
  params?: CardGetPaginationParams
) {
  const { createClientFn, isPending: loadingCreateClient, error: createError } = useCreateClient(params);

  const onClickCreateButton = async (clientData: IClientCreate) => {
    const res = await createClientFn({ body: clientData, clientCreateParams: { cardId } });
    if (res) {
      updateFormStatus('frozen');
    }
  };

  useEffect(() => {
    if (isAxiosError<BasicErrorType>(createError)) {
      if (createError.response?.data) {
        const { errors } = createError.response.data;

        Object.entries(errors).forEach(([field, messages]) => {
          formApi.setError(field as keyof IClientCreate, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(' ') : messages,
          });
        });
      }
    }
  }, [createError, formApi]);

  return { onClickCreateButton, loadingCreateClient };
}
