import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import RHFDatePicker from '@/shared/ui/inputs/RHFDatePicker';
import LabelContainer from '@/shared/ui/LabelContainer';
import { RHFTextField } from '@/shared/ui/RHFTextField';

import { Grid2, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider, UseFormReturn, useWatch } from 'react-hook-form';

interface TourFieldsProps {
  formApi: UseFormReturn<TourCreateDto, any, undefined>;
  BonusExpectationComponent: React.ReactNode;
  AllowedToSpend: React.ReactNode;
  allowedToSpend: number;
}

export default function TourFields({
  formApi,
  BonusExpectationComponent,
  AllowedToSpend,
  allowedToSpend,
}: TourFieldsProps) {
  const { control, setValue } = formApi;
  const { bonusSpending } = useWatch({ control });
  const { data } = useGetTourStates();

  useEffect(() => {
    if (bonusSpending && bonusSpending > allowedToSpend && allowedToSpend !== 0)
      setValue('bonusSpending', allowedToSpend);
  }, [allowedToSpend, bonusSpending, setValue]);

  return (
    <FormProvider {...formApi}>
      <Grid2 container gap={2} flexDirection="column">
        <RHFTextField label="Название тура" name="name" control={control} />
        <RHFTextField label="Описание" name="description" control={control} multiline rows={2} />
        <Grid2 flexDirection="column" container gap={3}>
          {AllowedToSpend}
          <Grid2 gap={3} container flexDirection="row">
            <Grid2 container flexDirection="column" gap={2}>
              <RHFTextField name="price" label="Цена" control={control} currencyFormat decimalScale={0} />
              <RHFTextField
                label="Бонусы"
                name="bonusSpending"
                control={control}
                disabled={!allowedToSpend}
                currencyFormat
                decimalScale={0}
              />
            </Grid2>
            <Grid2 container gap={1} flexDirection="column">
              {BonusExpectationComponent}
              <LabelContainer label="Бонусов будет списано">
                <Typography color="error">{numberFormatToPriceFormat(bonusSpending || 0)}</Typography>
              </LabelContainer>
            </Grid2>
          </Grid2>
        </Grid2>

        <RHFTextField label="Статус" name="state" control={control} options={data} fullWidth />
        <Grid2 container gap={3} justifyContent="space-between">
          <RHFDatePicker label="Дата отправления" name="fromDate" control={control} />
          <RHFDatePicker label="Дата возвращения" name="toDate" control={control} />
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}
