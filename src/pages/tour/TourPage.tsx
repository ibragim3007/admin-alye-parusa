import CardInfoBig from '@/features/cardInfoBig/CardInfoBig';
import { Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import mockCardGetDto from './mock';
import { useGetTourByClientId } from '@/entities/tour/tour.repository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { CardBalanceLazy } from '@/features/cardBalance';

export default function TourPage() {
  const { clientId } = useParams();

  const { data, isLoading } = useGetTourByClientId(parseInt(clientId || '0'));

  return (
    <Grid2
      sx={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto' }}
      container
      flexDirection="column"
      gap={3}
      padding={3}
    >
      <Typography variant="h3">Туры</Typography>
      {isLoading && <LoaderGeneral />}
      {!data && !isLoading && <LoaderGeneral />}
      {data && !isLoading && <CardInfoBig tour={data} BalanceComponent={<CardBalanceLazy cardId={data.card.id} />} />}
    </Grid2>
  );
}
