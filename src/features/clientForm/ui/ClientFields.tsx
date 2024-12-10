import { IClientCreate } from '@/entities/client/types';
import { useGetContactTypes } from '@/entities/dictionary/dictionary.repository';
import RHFDatePicker from '@/shared/ui/inputs/RHFDatePicker';
import { RHFTextField } from '@/shared/ui/RHFTextField';
import { Grid2, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface ClientFieldsProps {
  actionButton: React.ReactNode;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
  isFrozen: boolean;
}

export default function ClientFields({ formApi, isFrozen }: ClientFieldsProps) {
  const { control } = formApi;
  const { data } = useGetContactTypes();

  return (
    <FormProvider {...formApi}>
      <Grid2 gap={2} container wrap="wrap">
        <Grid2 gap={2} container flexDirection="column" size={'grow'} minWidth={250}>
          <RHFTextField name="name" label="Имя" control={control} disabled={isFrozen} />
          <RHFTextField disabled={isFrozen} name="patronymic" label="Отчество" control={control} />
          <RHFTextField disabled={isFrozen} name="surname" label="Фамилия" control={control} />
          <RHFDatePicker
            disableFuture={true}
            disabled={isFrozen}
            label="День рождения"
            name="birthday"
            control={control}
          />
        </Grid2>
        <Grid2 container gap={2} size={'grow'} minWidth={250}>
          <RHFTextField disabled={isFrozen} name="phone" label="Номер" control={control} fullWidth />
          <Grid2 width={'100%'} container gap={1} flexDirection="row" wrap="nowrap">
            <RHFTextField
              disabled={isFrozen}
              name="contactType"
              control={control}
              options={data}
              label={'Вид связи'}
              fullWidth
            />
            <RHFTextField
              disabled={isFrozen}
              name="contact"
              label="Дополнительный контакт"
              control={control}
              fullWidth
            />
          </Grid2>

          <Typography>Паспорт</Typography>
          <Grid2 gap={2} container flexDirection="row" wrap="nowrap">
            <RHFTextField disabled={isFrozen} name="passportType" label="Тип" control={control} fullWidth />
            <RHFTextField disabled={isFrozen} name="passportSeries" label="Серия" control={control} fullWidth />
            <RHFTextField disabled={isFrozen} name="passportNumber" label="Номер" control={control} fullWidth />
          </Grid2>
          <RHFTextField
            disabled={isFrozen}
            name="comment"
            label="Комментарий"
            control={control}
            multiline
            rows={2}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}
