import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ICard } from '@/entities/card/types';
import { formatIsoDateToLocalString } from '@/shared/helpers/covertTimeToLocal';
import { Button, Card, Divider, Grid2, Typography } from '@mui/material';
import StatusInfo from './ui/StatusInfo';

interface CardItemProps {
  card: ICard;
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <Card sx={{ p: 2, maxWidth: 500 }}>
      <Grid2 container flexDirection="column" gap={1}>
        <Grid2 container justifyContent="space-between">
          <Typography variant="h5">{formatCardNumber(card.cardNumber)}</Typography>
          <Typography variant="h6">{card.bonusPercentage}%</Typography>
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
          <StatusInfo card={card} />
          <Button>Создать клиента</Button>
        </Grid2>
      </Grid2>
    </Card>
  );
}
