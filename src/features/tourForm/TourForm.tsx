import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { useCreateTour } from '@/entities/tour/tour.repository';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AllowedToSpendProps } from '../allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '../bonusExpectation/BonusExpectation';
import TourFields from './TourFields/TourFields';

import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
import { ITourClientGet } from '@/entities/tour/types';
import { RHFsetErrorsToInputs } from '@/shared/helpers/RHFsetErrorsToInputs';
interface TourFormProps {
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
  tour: ITourClientGet;
}

export default function TourForm({ BonusExpectationComponent, AllowedToSpend, tour }: TourFormProps) {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);
  const { data: tourStates } = useGetTourStates();
  const formApi = useForm<TourCreateDto>({
    defaultValues: {
      cardId: tour.card.id,
      name: '',
      description: '',
      price: 0,
      bonusSpending: 0,
      fromDate: new Date(),
      toDate: new Date(),
      state: (tourStates || [])[0] || 'approved',
    },
  });

  const resetFields = () => formApi.reset();

  const { createTourFn, isPending, error } = useCreateTour(tour.card.id, tour.client.id);

  useEffect(() => {
    RHFsetErrorsToInputs(error, formApi);
  }, [error, formApi]);

  const onCreateButtom = async (data: TourCreateDto) => {
    const res = await createTourFn(data);
    if (res) {
      resetFields();
      toggleDialog();
    }
  };

  return (
    <Grid2>
      <Dialog fullWidth open={open} onClose={toggleDialog}>
        <Grid2>
          <DialogTitle>
            <Grid2 container justifyContent="space-between">
              Создание тура для карты {formatCardNumber(tour.card.cardNumber)}
              <Button onClick={resetFields}>Сбросить поля</Button>
            </Grid2>
          </DialogTitle>
        </Grid2>
        <DialogContent sx={{ paddingTop: 2 }}>
          <Grid2 container gap={3} flexDirection="column">
            <TourFields
              formApi={formApi}
              BonusExpectationComponent={BonusExpectationComponent}
              AllowedToSpend={AllowedToSpend}
            />
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Отменить</Button>
          <LoadingButton
            loading={isPending}
            variant="contained"
            onClick={() => void formApi.handleSubmit(onCreateButtom)()}
          >
            Создать
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={toggleDialog}>
        Создать тур
      </Button>
    </Grid2>
  );
}
