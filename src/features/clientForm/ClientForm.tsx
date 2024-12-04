import { useGetClientById } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import ClientFields from './ui/ClientFields';
import CreateClientButton from './ui/create-client-button/CreateClientButton';

const renderAddClientButton = ({
  ...props
}: {
  cardId: string;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
}) => {
  return <CreateClientButton {...props} />;
};

type formStatuses = 'edit' | 'create' | 'frozen';

export interface ClientFormProps {
  formStatusProps?: formStatuses;
  cardId: string;
  clientId?: number;
}

export default function ClientForm({ cardId, formStatusProps = 'create', clientId }: ClientFormProps) {
  const { data, isLoading, isError } = useGetClientById(clientId || 0);

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

      {formStatus === 'create' &&
        renderAddClientButton({
          cardId: cardId,
          formApi,
        })}
    </Grid2>
  );
}
