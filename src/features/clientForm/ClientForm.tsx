import { useGetClientById } from '@/entities/client/client.repository';
import { IClientCreate, IEditClient } from '@/entities/client/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import ClientFields from './ui/ClientFields';
import CreateClientButton from './ui/create-client-button/CreateClientButton';
import { formStatuses } from './types';
import EditClientButton from './ui/edit-client-button/EditClientButton';
import EditIcon from '@mui/icons-material/Edit';
import { PopoverCustom } from '@/shared/ui/PopoverCustom';

const renderAddClientButton = ({
  ...props
}: {
  cardId: string;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
}) => {
  return <CreateClientButton {...props} />;
};

const renderEditClientButton = ({
  ...props
}: {
  id: number;
  formApi: UseFormReturn<IEditClient, any, undefined>;
  updateFormStatus: (formStatus: formStatuses) => void;
}) => {
  return <EditClientButton {...props} />;
};

export interface ClientFormProps {
  formStatusProps?: formStatuses;
  cardId: string;
  clientId?: number;
}

export default function ClientForm({ cardId, formStatusProps = 'create', clientId }: ClientFormProps) {
  const { data, isLoading, isError } = useGetClientById(clientId || 0);

  const [formStatus, setFormStatus] = useState<formStatuses>(formStatusProps);

  const updateFormStatus = (formStatus: formStatuses) => {
    setFormStatus(formStatus);
  };

  const isFrozen = formStatus === 'frozen';

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
    mode: 'onChange',
  });

  useEffect(() => {
    if (data) {
      formApi.reset(data);
    }
  }, [data, formApi]);

  const isNewClient = formStatus === 'create';

  if (isLoading) {
    return (
      <Grid2 container width={'100%'} gap={2} mt={2} flexDirection="column">
        <LoaderGeneral />
      </Grid2>
    );
  }

  return (
    <Grid2 container width={'100%'} gap={2} mt={2} flexDirection="column">
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{isNewClient ? 'Создание клиента' : 'Изменение клиента'}</Typography>
        {clientId && (
          <PopoverCustom label="Изменить клиента">
            <IconButton onClick={() => updateFormStatus(formStatus === 'edit' ? 'frozen' : 'edit')}>
              <EditIcon />
            </IconButton>
          </PopoverCustom>
        )}
      </Grid2>
      <ClientFields isFrozen={isFrozen} formApi={formApi} actionButton={undefined} />
      <Grid2>
        {(() => {
          if (formStatus === 'create') {
            return renderAddClientButton({
              cardId: cardId,
              formApi,
            });
          }

          if (formStatus === 'frozen' || formStatus === 'edit') {
            return renderEditClientButton({
              id: clientId || 0,
              formApi,
              updateFormStatus,
            });
          }
        })()}
      </Grid2>
    </Grid2>
  );
}
