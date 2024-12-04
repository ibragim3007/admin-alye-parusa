import { IClientCreate } from '@/entities/client/types';
import { Button, Grid2, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ClientFields from './ui/ClientFields';
import { useEffect, useState } from 'react';
import { useCreateClient, useGetClientById } from '@/entities/client/client.repository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';

type formStatuses = 'edit' | 'create' | 'frozen';

export interface ClientFormProps {
  formStatusProps?: formStatuses;
  cardId: string;
  clientId?: number;
}

export default function ClientForm({ cardId, formStatusProps = 'create', clientId }: ClientFormProps) {
  const { data, isLoading, isError } = useGetClientById(clientId || 0);
  const { createClientFn } = useCreateClient();

  const [formStatus, setformStatus] = useState<formStatuses>(formStatusProps);

  const formApi = useForm<IClientCreate>({
    defaultValues: {
      comment: '',
      contact: '',
      contactType: 'telegramm',
      name: '',
      passportNumber: '',
      passportSeries: '',
      passportType: '',
      patronymic: '',
      phone: '',
      surname: '',
    },
  });

  useEffect(() => {
    if (data) {
      formApi.reset(data);
    }
  }, [data, formApi]);

  const onClickAdd = async (data: IClientCreate) => {
    await createClientFn({ clientCreateParams: { cardId: cardId }, body: data });
  };

  if (isLoading) {
    return (
      <Grid2 container width={'100%'} gap={2} mt={2} flexDirection="column">
        <LoaderGeneral />
      </Grid2>
    );
  }

  return (
    <Grid2 container width={'100%'} gap={2} mt={2} flexDirection="column">
      <Typography variant="h6">Создание клиента</Typography>
      <ClientFields formApi={formApi} actionButton={undefined} />

      <Button variant="contained" onClick={() => void formApi.handleSubmit(onClickAdd)()}>
        Создать клиента
      </Button>
    </Grid2>
  );
}
