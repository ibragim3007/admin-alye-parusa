import { IClientCreate } from '@/entities/client/types';
import { LoadingButton } from '@mui/lab';
import { Button, Grid2 } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { formStatuses } from '../../types';

export interface EditClientButtonProps {
  formApi: UseFormReturn<IClientCreate, any, undefined>;
  callback: () => Promise<void>;
  toggleForm: () => void;
  loading: boolean;
  formStatus: formStatuses;
}

export default function EditClientButton({
  callback,
  toggleForm,
  loading,
  formApi,
  formStatus,
}: EditClientButtonProps) {
  if (formStatus !== 'edit') return null;

  const isDirty = formApi.formState.isDirty;

  return (
    <Grid2 container justifyContent="flex-end" gap={3}>
      {!isDirty ? (
        <Button onClick={() => toggleForm()}>Скрыть</Button>
      ) : (
        <Button onClick={() => formApi.reset()}>Отменить</Button>
      )}
      <LoadingButton variant="contained" disabled={!isDirty} loading={loading} onClick={() => void callback()}>
        Сохранить клиента
      </LoadingButton>
    </Grid2>
  );
}
