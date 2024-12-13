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
import { useGetContactTypes } from '@/entities/dictionary/dictionary.repository';
import LabelContainer from '@/shared/ui/LabelContainer';
import { formatIsoDateToLocalString } from '@/shared/helpers/covertTimeToLocal';

const renderAddClientButton = ({ ...props }: CreateClientButtonProps) => <CreateClientButton {...props} />;

const renderEditClientButton = ({ ...props }: EditClientButtonProps) => {
  return <EditClientButton {...props} />;
};

export interface ClientFormProps {
  formStatusProps?: formStatuses;
  cardId: string;
  clientId?: number;
  params?: CardGetPaginationParams;
  toggleForm: () => void;
}

export default function ClientForm({
  params,
  cardId,
  formStatusProps = 'create',
  clientId,
  toggleForm,
}: ClientFormProps) {
  const [formStatus, setFormStatus] = useState<formStatuses>(formStatusProps);
  const { data, isLoading } = useGetClientById(clientId || 0, formStatus);
  const updateFormStatus = (formStatus: formStatuses) => setFormStatus(formStatus);
  const { data: contactTypes } = useGetContactTypes();

  const formApi = useForm<IClientCreate>({
    defaultValues: {
      comment: '',
      contact: '',
      contactType: (contactTypes || [])[0] || 'unknown',
      name: '',
      passportNumber: '',
      passportSeries: '',
      passportType: '',
      patronymic: '',
      phone: '',
      surname: '',
      birthday: undefined,
    },
  });

  const { onClickCreateButton, loadingCreateClient } = useCreateClientForm(cardId, formApi, updateFormStatus, params);
  const { onClickEditButton, loadingUpdateClient } = useEditClientForm(formApi, updateFormStatus, cardId);

  useEffect(() => {
    if (data && !isLoading) formApi.reset(data);
  }, [data, isLoading]);

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
        {data && (
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
      {data && (
        <Grid2>
          <LabelContainer label="Дата создания" gridProps={{ container: true, flexDirection: 'row', gap: 1 }}>
            <Typography variant="body2">{formatIsoDateToLocalString(data?.createdAt)}</Typography>
          </LabelContainer>
          <LabelContainer label="Дата изменения" gridProps={{ container: true, flexDirection: 'row', gap: 1 }}>
            <Typography variant="body2">{formatIsoDateToLocalString(data?.updatedAt)}</Typography>
          </LabelContainer>
        </Grid2>
      )}
      <Grid2 container justifyContent="flex-end">
        {(() => {
          if (formStatus === 'create') {
            return renderAddClientButton({
              callback: () => formApi.handleSubmit(onClickCreateButton)(),
              params,
              loading: loadingCreateClient,
              toggleForm,
            });
          }

          if (formStatus === 'frozen' || formStatus === 'edit') {
            return renderEditClientButton({
              loading: loadingUpdateClient,
              formStatus,
              formApi,
              toggleForm,
              callback: () => formApi.handleSubmit((data) => onClickEditButton(clientId || 0, data))(),
            });
          }
        })()}
      </Grid2>
    </Grid2>
  );
}
