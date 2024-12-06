import { useGetClientById } from '@/entities/client/client.repository';
import { IClientCreate } from '@/entities/client/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import EditIcon from '@mui/icons-material/Edit';
import { Grid2, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateClientForm } from './hooks/useCreateClientForm';
import { useEditClientForm } from './hooks/useEditClientForm';
import { formStatuses } from './types';
import ClientFields from './ui/ClientFields';
import CreateClientButton, { CreateClientButtonProps } from './ui/create-client-button/CreateClientButton';
import EditClientButton, { EditClientButtonProps } from './ui/edit-client-button/EditClientButton';

const renderAddClientButton = ({ ...props }: CreateClientButtonProps) => <CreateClientButton {...props} />;

const renderEditClientButton = ({ ...props }: EditClientButtonProps) => {
  return <EditClientButton {...props} />;
};

export interface ClientFormProps {
  formStatusProps?: formStatuses;
  cardId: string;
  clientId?: number;
  params?: CardGetPaginationParams;
}

export default function ClientForm({ params, cardId, formStatusProps = 'create', clientId }: ClientFormProps) {
  const { data, isLoading } = useGetClientById(clientId || 0);
  const [formStatus, setFormStatus] = useState<formStatuses>(formStatusProps);
  const updateFormStatus = (formStatus: formStatuses) => setFormStatus(formStatus);

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

  const { onClickCreateButton, loadingCreateClient } = useCreateClientForm(cardId, formApi, updateFormStatus, params);
  const { onClickEditButton, loadingUpdateClient } = useEditClientForm(formApi, updateFormStatus);

  useEffect(() => {
    if (data) formApi.reset(data);
  }, [data, formApi]);

  const isFrozen = formStatus === 'frozen';
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
          <Tooltip title="Изменить клиента">
            <IconButton
              sx={{ bgcolor: formStatus === 'edit' ? 'background.default' : 'transparent' }}
              onClick={() => updateFormStatus(formStatus === 'edit' ? 'frozen' : 'edit')}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Grid2>
      <ClientFields isFrozen={isFrozen} formApi={formApi} actionButton={undefined} />
      <Grid2 container justifyContent="flex-end">
        {(() => {
          if (formStatus === 'create') {
            return renderAddClientButton({
              callback: () => formApi.handleSubmit(onClickCreateButton)(),
              params,
              loading: loadingCreateClient,
            });
          }

          if (formStatus === 'frozen' || formStatus === 'edit') {
            return renderEditClientButton({
              loading: loadingUpdateClient,
              formStatus,
              formApi,
              callback: () => formApi.handleSubmit((data) => onClickEditButton(clientId || 0, data))(),
            });
          }
        })()}
      </Grid2>
    </Grid2>
  );
}
