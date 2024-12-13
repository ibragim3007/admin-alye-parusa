import { useUpdateTour } from '@/entities/tour/tour.repository';
import { AllowedToSpendProps } from '@/features/allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '@/features/bonusExpectation/BonusExpectation';
import { formStatuses } from '@/features/clientForm/types';
import { TourFieldsProps } from '@/features/tourForm/TourFields/TourFields';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { RHFsetErrorsToInputs } from '@/shared/helpers/RHFsetErrorsToInputs';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateCellProps {
  tour: TourGetDto;
  TourFields: React.ElementType<TourFieldsProps>;
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
}

export default function UpdateCell({ tour, TourFields, BonusExpectationComponent, AllowedToSpend }: UpdateCellProps) {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);
  const { updateTourFn, isPending, error } = useUpdateTour();

  const [formState, setFormState] = useState<formStatuses>('frozen');
  const updateFormStatus = (state: formStatuses) => setFormState(state);

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

  useEffect(() => {
    RHFsetErrorsToInputs(error, formApi);
  }, [error, formApi]);

  useEffect(() => {
    if (formState === 'frozen') formApi.reset();
  }, [formApi, formState]);

  useEffect(() => {
    if (!isPending) formApi.reset({ ...tour, fromDate: new Date(tour.fromDate), toDate: new Date(tour.toDate) });
  }, [formApi, isPending, tour]);

  const handlerClickEdit = async (data: TourCreateDto) => {
    const res = await updateTourFn({ id: tour.id, data: data });
    if (res) {
      toggleDialog();
      updateFormStatus('frozen');
    }
  };

  const handleClickCancel = () => {
    formApi.reset();
    toggleDialog();
    updateFormStatus('frozen');
  };

  const isDirty = formApi.formState.isDirty;

  return (
    <Grid2 container justifyContent="center" alignItems="center" height="100%">
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleDialog}>
        <Grid2>
          <DialogTitle>
            <Grid2 container justifyContent="space-between">
              Редактирование тура
              <IconButton onClick={() => updateFormStatus(formState === 'edit' ? 'frozen' : 'edit')}>
                <EditIcon />
              </IconButton>
            </Grid2>
          </DialogTitle>
        </Grid2>
        <DialogContent sx={{ paddingTop: 2 }}>
          <Grid2 container gap={3} flexDirection="column">
            <TourFields
              tourId={tour.id}
              formApi={formApi}
              BonusExpectationComponent={BonusExpectationComponent}
              AllowedToSpend={AllowedToSpend}
              disableForm={formState === 'frozen'}
            />
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Отмена</Button>
          <LoadingButton
            loading={isPending}
            disabled={!isDirty}
            onClick={() => void formApi.handleSubmit(handlerClickEdit)()}
            variant="contained"
          >
            Сохранить
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
}
