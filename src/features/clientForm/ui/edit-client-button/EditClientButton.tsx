import { useUpdateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { LoadingButton } from '@mui/lab';
import { Button, Grid2 } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../../types';

interface EditClientButtonProps {
  id: number;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
  updateFormStatus: (formStatus: formStatuses) => void;
}

export default function EditClientButton({ id, formApi, updateFormStatus }: EditClientButtonProps) {
  const { updateClientFn, isPending } = useUpdateClient();

  const onClickCreateButton = async (clientData: IClientCreate) => {
    await updateClientFn({ id: id, body: clientData });
    updateFormStatus('frozen');
  };

  return (
    <Grid2 container justifyContent="flex-end" gap={3}>
      <Button onClick={() => formApi.reset()}>Отменить</Button>
      <LoadingButton
        variant="contained"
        disabled={!formApi.formState.isDirty}
        loading={isPending}
        onClick={() => void formApi.handleSubmit(onClickCreateButton)()}
      >
        Сохранить клиента
      </LoadingButton>
    </Grid2>
  );
}
