import { useUpdateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { RHFsetErrorsToInputs } from '@/shared/helpers/RHFsetErrorsToInputs';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../types';

export function useEditClientForm(
  formApi: UseFormReturn<IClientCreate, any, undefined>,
  updateFormStatus: (formStatus: formStatuses) => void,
  cardId: string
) {
  const { updateClientFn, isPending: loadingUpdateClient, error: editError } = useUpdateClient(cardId);
  const onClickEditButton = async (id: number, clientData: IClientCreate) => {
    const res = await updateClientFn({ id: id, body: clientData });
    if (res) updateFormStatus('frozen');
  };

  useEffect(() => {
    RHFsetErrorsToInputs(editError, formApi);
  }, [editError, formApi]);

  return {
    onClickEditButton,
    loadingUpdateClient,
  };
}
