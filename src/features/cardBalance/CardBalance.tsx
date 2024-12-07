import { useGetCardBalance } from '@/entities/card/card.respository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Typography } from '@mui/material';

interface CardBalanceProps {
  cardId: number;
}

export default function CardBalance({ cardId }: CardBalanceProps) {
  const { data, isLoading } = useGetCardBalance(cardId);
  if (isLoading) return <LoaderGeneral />;
  return <Typography>{data?.total}</Typography>;
}
