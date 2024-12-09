import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { TourFieldsProps } from '@/features/tourForm/TourFields/TourFields';
import { useForm } from 'react-hook-form';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { BonusExpectationProps } from '@/features/bonusExpectation/BonusExpectation';
import { AllowedToSpendProps } from '@/features/allowedToSpend/AllowedToSpend';

interface UpdateCellProps {
  tour: TourGetDto;
  TourFields: React.ElementType<TourFieldsProps>;
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
}

export default function UpdateCell({ tour, TourFields, BonusExpectationComponent, AllowedToSpend }: UpdateCellProps) {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);

  const formApi = useForm<TourCreateDto>({
    defaultValues: {
      cardId: tour.cardId,
      name: tour.name,
      description: tour.description,
      price: tour.price,
      bonusSpending: tour.bonusSpending,
      fromDate: new Date(tour.fromDate),
      toDate: new Date(tour.toDate),
      state: tour.state,
    },
  });

  return (
    <Grid2 container justifyContent="center" alignItems="center" height="100%">
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Редактирование тура</DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          <TourFields
            formApi={formApi}
            BonusExpectationComponent={BonusExpectationComponent}
            AllowedToSpend={AllowedToSpend}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Отмена</Button>
          <Button variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
}
