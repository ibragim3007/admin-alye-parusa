import { ICard } from '@/entities/card/types';
import { Card, Grid2, Typography } from '@mui/material';

interface CardItemProps {
  card: ICard;
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <Card sx={{ p: 3 }}>
      <Grid2>
        <Typography>Номер карты: {card.cardNumber}</Typography>
        <Typography>Бонусные проценты: {card.bonusPercentage}</Typography>
        <Typography>Статус: {card.status}</Typography>
        <Typography>Комментарий: {card.cardComment}</Typography>
      </Grid2>
    </Card>
  );
}
