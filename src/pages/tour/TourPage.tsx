import { useGetTourByClientId } from '@/entities/tour/tour.repository';
import AllowedToSpend from '@/features/allowedToSpend/AllowedToSpend';
import BonusExpectation from '@/features/bonusExpectation/BonusExpectation';
import { CardBalanceLazy } from '@/features/cardBalance';
import { CardInfoBigLazy } from '@/features/cardInfoBig';
import { TourFieldsLazy } from '@/features/tourForm';
import TourForm from '@/features/tourForm/TourForm';
import { ToursTableLazy } from '@/features/toursTable';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { FormControlLabel, Grid2, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TourPage() {
  const { clientId } = useParams();
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const toggleIncludeDeleted = () => setIncludeDeleted(!includeDeleted);

  const { data, isLoading, refetch } = useGetTourByClientId(parseInt(clientId || '0'), { includeDeleted });

  useEffect(() => {
    void refetch();
  }, [refetch]);

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
          <CardInfoBigLazy
            tour={data}
            BalanceComponent={<CardBalanceLazy cardId={data.card.id} />}
            CreateTourComponent={
              <TourForm
                tour={data}
                BonusExpectationComponent={BonusExpectation}
                AllowedToSpend={AllowedToSpend} // Pass AllowedToSpend component
              />
            }
          />
          <FormControlLabel
            onChange={toggleIncludeDeleted}
            checked={includeDeleted}
            control={<Switch />}
            label="Показать удаленные"
          />
          <ToursTableLazy
            data={data}
            TourFields={TourFieldsLazy}
            AllowedToSpend={AllowedToSpend}
            BonusExpectationComponent={BonusExpectation}
          />
        </>
      )}
    </Grid2>
  );
}
