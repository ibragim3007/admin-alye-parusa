import { useCreateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { RHFsetErrorsToInputs } from '@/shared/helpers/RHFsetErrorsToInputs';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../types';

export function useCreateClientForm(
  cardId: string,
  formApi: UseFormReturn<IClientCreate, any, undefined>,
  updateFormStatus: (formStatus: formStatuses) => void,
  params?: CardGetPaginationParams
) {
  const { createClientFn, isPending: loadingCreateClient, error: createError } = useCreateClient(cardId, params);

  const onClickCreateButton = async (clientData: IClientCreate) => {
    const res = await createClientFn({ body: clientData, clientCreateParams: { cardId } });
    if (res) updateFormStatus('frozen');
  };

  useEffect(() => {
    RHFsetErrorsToInputs(createError, formApi);
  }, [createError, formApi]);

  return { onClickCreateButton, loadingCreateClient };
}
