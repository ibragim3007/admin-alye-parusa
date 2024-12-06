import { useCreateClient, useGetClientById } from '@/entities/client/client.repository';
import { IClientCreate, IEditClient } from '@/entities/client/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import EditIcon from '@mui/icons-material/Edit';
import { Grid2, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { formStatuses } from './types';
import ClientFields from './ui/ClientFields';
import CreateClientButton, { CreateClientButtonProps } from './ui/create-client-button/CreateClientButton';
import EditClientButton from './ui/edit-client-button/EditClientButton';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { BasicErrorType, isAxiosError } from '@/shared/utils/axiosErrorHandler';

const renderAddClientButton = ({ ...props }: CreateClientButtonProps) => <CreateClientButton {...props} />;

const renderEditClientButton = ({
  ...props
}: {
  id: number;
  formApi: UseFormReturn<IEditClient, any, undefined>;
  updateFormStatus: (formStatus: formStatuses) => void;
  params?: CardGetPaginationParams;
}) => {
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

  const { createClientFn, isPending: isPendingCreateClient, error: createError } = useCreateClient(params);

  const onClickCreateButton = async (clientData: IClientCreate) => {
    await createClientFn({ body: clientData, clientCreateParams: { cardId } });
  };

  useEffect(() => {
    if (isAxiosError<BasicErrorType>(createError)) {
      if (createError.response?.data) {
        const { errors } = createError.response.data;

        Object.entries(errors).forEach(([field, messages]) => {
          formApi.setError(field as keyof IClientCreate, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(' ') : messages,
          });
        });
      }
    }
  }, [createError, formApi]);

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
              loading: isPendingCreateClient,
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
