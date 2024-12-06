import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { LoadingButton } from '@mui/lab';

export interface CreateClientButtonProps {
  callback: () => Promise<void>;
  loading?: boolean;
  params?: CardGetPaginationParams;
}

export default function CreateClientButton({ loading, callback }: CreateClientButtonProps) {
  return (
    <LoadingButton variant="contained" loading={loading} onClick={() => void callback()}>
      Создать клиента
    </LoadingButton>
  );
}
