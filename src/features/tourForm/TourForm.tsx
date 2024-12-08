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
interface TourFormProps {
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
  cardId: number;
}

export default function TourForm({ BonusExpectationComponent, AllowedToSpend, cardId }: TourFormProps) {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);

  const formApi = useForm<TourCreateDto>({
    defaultValues: {
      state: 'approved',
      cardId: 1,
      name: '',
      price: 0,
      bonusSpending: 0,
      description: '',
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const { price, bonusSpending } = useWatch({ control: formApi.control });
  const { data } = useGetBonusExpectation(cardId, { price: price || 0, bonuses: bonusSpending || 0 });
  const { createTourFn, isPending } = useCreateTour();

  const onCreateButtom = async (data: TourCreateDto) => {
    await createTourFn(data);
    toggleDialog();
  };

  return (
    <Grid2>
      <Dialog fullWidth open={open} onClose={toggleDialog}>
        <Grid2>
          <DialogTitle>Создание тура для карты {formatCardNumber(1)}</DialogTitle>
        </Grid2>
        <DialogContent sx={{ paddingTop: 2 }}>
          <Grid2 container gap={3} flexDirection="column">
            <TourFields
              formApi={formApi}
              BonusExpectationComponent={
                <BonusExpectationComponent id={cardId} price={price || 0} bonuses={bonusSpending || 0} />
              }
              AllowedToSpend={<AllowedToSpend id={cardId} price={price || 0} bonuses={bonusSpending || 0} />}
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
