import { useCreateCard } from '@/entities/card/card.respository';
import { ICreateCard } from '@/entities/card/types';
import { LoadingButton } from '@mui/lab';
import { Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface CreateCardFormProps {
  handleClose: () => void;
}

export default function CreateCardForm({ handleClose }: CreateCardFormProps) {
  const { createCardFunction, isPending } = useCreateCard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCard>({
    defaultValues: {
      bonusPercentage: 1,
      cardComment: '',
      cardNumber: 1,
    },
  });

  const onAddClick = async (data: ICreateCard) => {
    if (await createCardFunction(data)) handleClose();
  };

  return (
    <Grid2 container flexDirection={'column'} gap={2}>
      <TextField
        {...register('cardNumber', { required: true })}
        label="Номер карты"
        fullWidth
        error={Boolean(errors.cardNumber?.message)}
      />
      <TextField
        {...register('bonusPercentage', { required: true })}
        label="Проценты"
        type="number"
        fullWidth
        error={Boolean(errors.bonusPercentage?.message)}
      />
      <TextField
        {...register('cardComment', { required: true })}
        rows={2}
        multiline
        label="Комментарий"
        fullWidth
        error={Boolean(errors.cardComment?.message)}
      />

      <LoadingButton loading={isPending} variant="contained" onClick={() => void handleSubmit(onAddClick)()}>
        Добавить
      </LoadingButton>
    </Grid2>
  );
}
