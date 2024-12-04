import { useCreateClient } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { Button, CircularProgress } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

interface CreateClientButtonProps {
  cardId: string;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
}

export default function CreateClientButton({ cardId, formApi }: CreateClientButtonProps) {
  const { createClientFn, isPending } = useCreateClient();

  const onClickCreateButton = async (clientData: IClientCreate) => {
    await createClientFn({ body: clientData, clientCreateParams: { cardId } });
  };

  return (
    <Button
      variant="contained"
      startIcon={isPending ? <CircularProgress /> : null}
      onClick={() => void formApi.handleSubmit(onClickCreateButton)()}
    >
      Создать клиента
    </Button>
  );
}
