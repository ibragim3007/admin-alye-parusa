import { useGetBonusExpectation } from '@/entities/card/card.respository';
import { formatCardNumber } from '@/entities/card/helpers/formatCardNumber';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { Button, Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AllowedToSpendProps } from '../allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '../bonusExpectation/BonusExpectation';
import TourFields from './TourFields/TourFields';
import { useCreateTour } from '@/entities/tour/tour.repository';
import { LoadingButton } from '@mui/lab';

import { ITourClientGet } from '@/entities/tour/types';
import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
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

  const { price, bonusSpending } = useWatch({ control: formApi.control });
  const { data } = useGetBonusExpectation(tour.card.id, { price: price || 0, bonuses: bonusSpending || 0 });
  const { createTourFn, isPending } = useCreateTour();

  const onCreateButtom = async (data: TourCreateDto) => {
    const res = await createTourFn(data);
    if (res) toggleDialog();
  };

  return (
    <Grid2>
      <Dialog fullWidth open={open} onClose={toggleDialog}>
        <Grid2>
          <DialogTitle>Создание тура для карты {formatCardNumber(tour.card.cardNumber)}</DialogTitle>
        </Grid2>
        <DialogContent sx={{ paddingTop: 2 }}>
          <Grid2 container gap={3} flexDirection="column">
            <TourFields
              formApi={formApi}
              BonusExpectationComponent={
                <BonusExpectationComponent id={tour.card.id} price={price || 0} bonuses={bonusSpending || 0} />
              }
              AllowedToSpend={<AllowedToSpend id={tour.card.id} price={price || 0} bonuses={bonusSpending || 0} />}
              allowedToSpend={data?.allowedToSpend || 0}
            />
            <Grid2 container gap={1} justifyContent="space-between">
              <Button onClick={toggleDialog}>Отменить</Button>
              <LoadingButton
                loading={isPending}
                variant="outlined"
                onClick={() => void formApi.handleSubmit(onCreateButtom)()}
              >
                Создать
              </LoadingButton>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Dialog>
      <Button variant="outlined" onClick={toggleDialog}>
        Создать тур
      </Button>
    </Grid2>
  );
}
