import { useUpdateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { Button, CircularProgress, Grid2 } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

interface EditClientButtonProps {
  id: number;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
}

export default function EditClientButton({ id, formApi }: EditClientButtonProps) {
  const { updateClientFn, isPending } = useUpdateClient();

  const onClickCreateButton = async (clientData: IClientCreate) => {
    await updateClientFn({ id: id, body: clientData });
  };

  return (
    <Grid2 container justifyContent="flex-end" gap={3}>
      <Button onClick={() => formApi.reset()}>Отменить</Button>
      <Button
        variant="contained"
        disabled={!formApi.formState.isDirty}
        startIcon={isPending ? <CircularProgress /> : null}
        onClick={() => void formApi.handleSubmit(onClickCreateButton)()}
      >
        Сохранить клиента
      </Button>
    </Grid2>
  );
}
