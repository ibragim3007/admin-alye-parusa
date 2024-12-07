import { useGetTourByClientId } from '@/entities/tour/tour.repository';
import { CardBalanceLazy } from '@/features/cardBalance';
import { CardInfoBigLazy } from '@/features/cardInfoBig';
import { ToursTableLazy } from '@/features/toursTable';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function TourPage() {
  const { clientId } = useParams();

  const { data, isLoading } = useGetTourByClientId(parseInt(clientId || '0'));

  return (
    <Grid2
      sx={{ minHeight: '100vh', maxWidth: 1200, margin: '0 auto' }}
      container
      flexDirection="column"
      gap={3}
      padding={3}
    >
      <Typography variant="h3">Туры</Typography>
      {isLoading && <LoaderGeneral />}
      {!data && !isLoading && <LoaderGeneral />}
      {data && !isLoading && (
        <>
          <CardInfoBigLazy tour={data} BalanceComponent={<CardBalanceLazy cardId={data.card.id} />} />
          <ToursTableLazy data={data} />
        </>
      )}
    </Grid2>
  );
}
