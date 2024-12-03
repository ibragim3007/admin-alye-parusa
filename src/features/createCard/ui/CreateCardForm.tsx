import { useCreateCard } from '@/entities/card/card.respository';
import { ICreateCard } from '@/entities/card/types';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function CreateCardForm() {
  const { createCardFunction } = useCreateCard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCard>({
    defaultValues: {
      bonusPercentage: 0,
      cardComment: '',
      cardNumber: 0,
    },
  });

  const onAddClick = async (data: ICreateCard) => {
    await createCardFunction(data);
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
      <Button variant="contained" onClick={handleSubmit(onAddClick)}>
        Добавить
      </Button>
    </Grid2>
  );
}
