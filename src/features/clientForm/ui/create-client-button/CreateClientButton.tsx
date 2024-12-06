import { useCreateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { LoadingButton } from '@mui/lab';
import { UseFormReturn } from 'react-hook-form';

interface CreateClientButtonProps {
  cardId: string;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
  params?: CardGetPaginationParams;
}

export default function CreateClientButton({ params, cardId, formApi }: CreateClientButtonProps) {
  const { createClientFn, isPending } = useCreateClient(params);

  const onClickCreateButton = async (clientData: IClientCreate) => {
    await createClientFn({ body: clientData, clientCreateParams: { cardId } });
  };

  return (
    <LoadingButton
      variant="contained"
      loading={isPending}
      onClick={() => void formApi.handleSubmit(onClickCreateButton)()}
    >
      Создать клиента
    </LoadingButton>
  );
}
