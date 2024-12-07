import { useGetCardBalance } from '@/entities/card/card.respository';
import { Skeleton, Typography } from '@mui/material';

interface CardBalanceProps {
  cardId: number;
}

export default function CardBalance({ cardId }: CardBalanceProps) {
  const { data, isLoading, isFetching } = useGetCardBalance(cardId);
  if (isLoading || isFetching) return <Skeleton height={25} animation="wave" />;
  return <Typography>{data?.total}</Typography>;
}
