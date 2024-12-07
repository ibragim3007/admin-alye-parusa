import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { ICard } from '@/entities/card/types';
import { Card, Chip, Grid2, Typography } from '@mui/material';

interface CardInfoBigProps {
  card: ICard;
}

export default function CardInfoBig({ card }: CardInfoBigProps) {
  return (
    <Grid2>
      <Card>
        <Grid2 sx={{ p: 2 }} container justifyContent="space-between">
          <Typography variant="h6">{card.shortName}</Typography>
          <Typography variant="h6">
            ПАСПОРТ: {card.client?.passportSeries} {card.client?.passportNumber}
          </Typography>
          <Grid2 container flexDirection="column">
            <Typography>{formatCardNumber(card.cardNumber)}</Typography>
            <Chip color="default" style={{ fontSize: 16 }} label={`${card.bonusPercentage}%`} variant="outlined" />
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
}
