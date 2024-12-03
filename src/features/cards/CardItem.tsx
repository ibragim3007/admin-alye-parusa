import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ICard } from '@/entities/card/types';
import { formatIsoDateToLocalString } from '@/shared/helpers/covertTimeToLocal';
import { Button, Card, Chip, Divider, Grid2, Typography } from '@mui/material';
import StatusInfo from './ui/StatusInfo';
import { PopoverCustom } from '@/shared/ui/PopoverCustom';
import { useUpdateCardStatus } from '@/entities/card/card.respository';

interface CardItemProps {
  card: ICard;
}

export default function CardItem({ card }: CardItemProps) {
  const { changeCardStatusFn, isPending } = useUpdateCardStatus();

  return (
    <Card sx={{ p: 2, maxWidth: 550 }}>
      <Grid2 container flexDirection="column" gap={1}>
        <Grid2 container justifyContent="space-between">
          <Grid2>
            <Typography variant="h6">{formatCardNumber(card.cardNumber)}</Typography>
            {card.shortName && (
              <Typography color="info" fontWeight={300} variant="body2">
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
          <Button>Создать клиента</Button>
        </Grid2>
      </Grid2>
    </Card>
  );
}
