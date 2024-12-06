import { useDeleteCard, useUpdateCardStatus } from '@/entities/card/card.respository';
import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ICard } from '@/entities/card/types';
import { CardGetPaginationParams } from '@/shared/api/entities/card/types/req.type';
import { formatIsoDateToLocalString } from '@/shared/helpers/covertTimeToLocal';
import DeleteButtonConfirmation from '@/shared/ui/delete-dialog/DeleteButtonConfirmation';
import { PopoverCustom } from '@/shared/ui/PopoverCustom';
import { Button, Card, Chip, Divider, Grid2, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { ClientFormProps } from '../clientForm/ClientForm';
import StatusInfo from './ui/StatusInfo';
interface CardItemProps {
  card: ICard;
  ClientForm: React.ElementType<ClientFormProps>;
  params?: CardGetPaginationParams;
}

export default function CardItem({ card, ClientForm, params }: CardItemProps) {
  const { changeCardStatusFn, isPending } = useUpdateCardStatus(params);
  const { deleteCardFn, isPending: deleteLoading } = useDeleteCard();
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const isClientExist = card.clientId !== null;

  return (
    <Grid2 style={{ width: '60%' }}>
      <Card sx={{ p: 2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <Grid2 container flexDirection="column" gap={1}>
          <Grid2 container justifyContent="space-between">
            <Grid2>
              <Typography variant="h6">{formatCardNumber(card.cardNumber)}</Typography>
              {card.shortName && (
                <Typography color="info" variant="body1">
                  {card.shortName}
                </Typography>
              )}
            </Grid2>
            <Tooltip title={'Бонусные проценты'}>
              <Chip color="default" style={{ fontSize: 16 }} label={`${card.bonusPercentage}%`} variant="outlined" />
            </Tooltip>
          </Grid2>
          <Divider />
          <Grid2 container gap={2} alignItems="center">
            <Typography fontWeight={400} variant="body2">
              {formatIsoDateToLocalString(card.createdAt)}
            </Typography>
            <Typography variant="body2" color="textDisabled">
              |
            </Typography>
            <Typography fontWeight={400} variant="body2">
              {card.cardComment}
            </Typography>
          </Grid2>
          <Divider />
          <Grid2 marginTop={3} container gap={2} justifyContent="space-between" alignItems="center">
            <Grid2 container gap={2}>
              <StatusInfo onChangeStatus={changeCardStatusFn} card={card} isLoading={isPending} />
              <DeleteButtonConfirmation
                loading={deleteLoading}
                callback={() => void deleteCardFn(card.id)}
                title="Вы уверены что хотите удалить карту навсегда?"
                content="Если вы это сделаете, будут утеряны все данные о турах этой карты и баланс её бонусов."
              />
            </Grid2>
            <Grid2>
              {isClientExist ? (
                <Button variant="outlined" onClick={toggleForm}>
                  Открыть профиль
                </Button>
              ) : (
                <Button onClick={toggleForm}>Создать клиента</Button>
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </Card>

      {showForm && (
        <Card sx={{ p: 2, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} elevation={0}>
          {isClientExist && card.clientId ? (
            <ClientForm params={params} clientId={card.clientId} formStatusProps="frozen" cardId={String(card.id)} />
          ) : (
            <ClientForm params={params} cardId={String(card.id)} formStatusProps="create" />
          )}
        </Card>
      )}
    </Grid2>
  );
}
