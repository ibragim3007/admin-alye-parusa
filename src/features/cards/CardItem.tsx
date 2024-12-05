import { useUpdateCardStatus } from '@/entities/card/card.respository';
import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ICard } from '@/entities/card/types';
import { formatIsoDateToLocalString } from '@/shared/helpers/covertTimeToLocal';
import { PopoverCustom } from '@/shared/ui/PopoverCustom';
import { Button, Card, Chip, Divider, Grid2, Typography } from '@mui/material';
import { useState } from 'react';
import { ClientFormProps } from '../clientForm/ClientForm';
import StatusInfo from './ui/StatusInfo';

interface CardItemProps {
  card: ICard;
  ClientForm: React.ElementType<ClientFormProps>;
}

export default function CardItem({ card, ClientForm }: CardItemProps) {
  const { changeCardStatusFn, isPending } = useUpdateCardStatus();
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const isClientExist = card.clientId !== null;

  return (
    <Card sx={{ p: 2, width: '60%' }}>
      <Grid2 container flexDirection="column" gap={1}>
        <Grid2 container justifyContent="space-between">
          <Grid2>
            <Typography variant="h6">{formatCardNumber(card.cardNumber)}</Typography>
            {card.shortName && (
              <Typography color="info" variant="body2">
                {card.shortName}
              </Typography>
            )}
          </Grid2>
          <PopoverCustom label={'Бонусные проценты'}>
            <Chip color="default" style={{ fontSize: 16 }} label={`${card.bonusPercentage}%`} variant="outlined" />
          </PopoverCustom>
        </Grid2>
        <Divider />
        <Grid2 container gap={2} alignItems="center">
          <Typography fontWeight={300} variant="body2">
            {formatIsoDateToLocalString(card.createdAt)}
          </Typography>
          <Typography fontWeight={300} variant="body2">
            {card.cardComment}
          </Typography>
        </Grid2>
        <Divider />
        <Grid2 marginTop={3} container justifyContent="space-between" alignItems="center">
          <StatusInfo onChangeStatus={changeCardStatusFn} card={card} isLoading={isPending} />
          {isClientExist && card.clientId ? (
            <>
              <Button onClick={toggleForm}>Открыть профиль</Button>
              {showForm && <ClientForm clientId={card.clientId} formStatusProps="frozen" cardId={String(card.id)} />}
            </>
          ) : (
            <>
              <Button onClick={toggleForm}>Создать клиента</Button>

              {showForm && <ClientForm cardId={String(card.id)} formStatusProps="create" />}
            </>
          )}
        </Grid2>
      </Grid2>
    </Card>
  );
}
function seGetClientById() {
  throw new Error('Function not implemented.');
}
