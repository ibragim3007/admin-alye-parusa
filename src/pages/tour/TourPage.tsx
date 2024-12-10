import { useGetTourByClientId } from '@/entities/tour/tour.repository';
import AllowedToSpend from '@/features/allowedToSpend/AllowedToSpend';
import BonusExpectation from '@/features/bonusExpectation/BonusExpectation';
import { CardBalanceLazy } from '@/features/cardBalance';
import { CardInfoBigLazy } from '@/features/cardInfoBig';
import { TourFieldsLazy } from '@/features/tourForm';
import TourForm from '@/features/tourForm/TourForm';
import { ToursTableLazy } from '@/features/toursTable';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import {
  Button,
  FormControlLabel,
  Grid2,
  Switch,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TourPage() {
  const { clientId } = useParams();
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const toggleIncludeDeleted = () => setIncludeDeleted(!includeDeleted);

  const { data, isLoading, refetch } = useGetTourByClientId(parseInt(clientId || '0'), { includeDeleted });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCompleteTour = () => {
    handleClose();
    window.close(); // Close the browser window
  };

  useEffect(() => {
    void refetch();
  }, [refetch, includeDeleted]);

  return (
    <Grid2
      sx={{ minHeight: '100vh', maxWidth: 1200, margin: '0 auto' }}
      container
      flexDirection="column"
      gap={3}
      padding={3}
    >
      <Grid2>
        <Typography variant="h3">Туры</Typography>
      </Grid2>
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
          <Grid2 container justifyContent="space-between">
            <FormControlLabel
              onChange={toggleIncludeDeleted}
              checked={includeDeleted}
              control={<Switch />}
              label="Показать удаленные"
            />
            <Button onClick={handleClickOpen}>Завершить</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Завершить тур</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Окно будет закрыто
                  <br /> Вы уверены, что хотите завершить этот тур?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleCompleteTour}>Завершить</Button>
              </DialogActions>
            </Dialog>
          </Grid2>
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
