import { IClientCreate } from '@/entities/client/types';
import { ContactTypesArray } from '@/shared/enums/constants';
import { RHFTextField } from '@/shared/ui/RHFTextField';
import { Autocomplete, Grid2, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';

interface ClientFieldsProps {
  actionButton: React.ReactNode;
  formApi: UseFormReturn<IClientCreate, any, undefined>;
}

export default function ClientFields({ formApi }: ClientFieldsProps) {
  const { control } = formApi;

  return (
    <FormProvider {...formApi}>
      <Grid2 gap={2} container flexDirection="row" wrap="nowrap">
        <Grid2 flex={1} gap={2} container flexDirection="column">
          <RHFTextField name="name" label="Имя" control={control} />
          <RHFTextField name="patronymic" label="Отчество" control={control} />
          <RHFTextField name="surname" label="Фамилия" control={control} />
        </Grid2>
        <Grid2 container gap={2} flex={2}>
          <RHFTextField name="phone" label="Номер" control={control} fullWidth />
          <Grid2 width={'100%'} container gap={1} flexDirection="row" wrap="nowrap">
            <Controller
              name="contactType"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  size="small"
                  value={field.value}
                  onChange={(event, type) => field.onChange(type || 'telegramm')}
                  options={ContactTypesArray}
                  renderInput={(params) => <TextField {...params} label="Вид связи" fullWidth />}
                  style={{ minWidth: 160 }}
                />
              )}
            />

            <RHFTextField name="contact" label="Дополнительный контакт" control={control} fullWidth />
          </Grid2>

          <Typography>Паспорт</Typography>
          <Grid2 gap={2} container flexDirection="row" wrap="nowrap">
            <RHFTextField name="passportType" label="Тип" control={control} fullWidth />
            <RHFTextField name="passportSeries" label="Серия" control={control} fullWidth />
            <RHFTextField name="passportNumber" label="Номер" control={control} fullWidth />
          </Grid2>
          <RHFTextField name="comment" label="Комментарий" control={control} multiline rows={2} fullWidth />
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}
