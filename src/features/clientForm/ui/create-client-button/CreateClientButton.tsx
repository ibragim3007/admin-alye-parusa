import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { LoadingButton } from '@mui/lab';
import { Button, Grid2 } from '@mui/material';

export interface CreateClientButtonProps {
  callback: () => Promise<void>;
  loading?: boolean;
  params?: CardGetPaginationParams;
  toggleForm: () => void;
}

export default function CreateClientButton({ loading, callback, toggleForm }: CreateClientButtonProps) {
  return (
    <Grid2 container justifyContent="flex-end" gap={3}>
      <Button onClick={() => toggleForm()}>Скрыть</Button>

      <LoadingButton variant="contained" loading={loading} onClick={() => void callback()}>
        Создать клиента
      </LoadingButton>
    </Grid2>
  );
}
