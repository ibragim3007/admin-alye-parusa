import { useGetBonusExpectation } from '@/entities/card/card.respository';
import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
import { AllowedToSpendProps } from '@/features/allowedToSpend/AllowedToSpend';
import { BonusExpectationProps } from '@/features/bonusExpectation/BonusExpectation';
import { TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { formatTourDates } from '@/shared/helpers/formatTourDates';
import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import RHFDatePicker from '@/shared/ui/inputs/RHFDatePicker';
import LabelContainer from '@/shared/ui/LabelContainer';
import { RHFTextField } from '@/shared/ui/RHFTextField';
import { tourStateStatusesConverted } from '@/shared/enums/cardStatusesConverted';

import { Grid2, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { FormProvider, UseFormReturn, useWatch } from 'react-hook-form';

export interface TourFieldsProps {
  formApi: UseFormReturn<TourCreateDto, any, undefined>;
  BonusExpectationComponent: React.ElementType<BonusExpectationProps>;
  AllowedToSpend: React.ElementType<AllowedToSpendProps>;
  disableForm?: boolean;
}

export default function TourFields({
  formApi,
  disableForm,
  BonusExpectationComponent,
  AllowedToSpend,
}: TourFieldsProps) {
  const { control, setValue } = formApi;
  const { bonusSpending, price, fromDate, toDate, cardId } = useWatch({ control });
  const { data: tourStates } = useGetTourStates();
  const { data } = useGetBonusExpectation(cardId, { price: price || 0, bonuses: bonusSpending || 0 });

  useEffect(() => {
    if (bonusSpending && bonusSpending > (data?.allowedToSpend ?? 0) && (data?.allowedToSpend ?? 0) !== 0)
      setValue('bonusSpending', data?.allowedToSpend ?? 0);
  }, [bonusSpending, data?.allowedToSpend, setValue]);

  const allowedToSpendValue = data?.allowedToSpend ?? 0;
  const bonusSpendingValue = bonusSpending ?? 0;
  const priceValue = price ?? 0;

  const priceLessThanZero = priceValue < 0;
  const allowedToSpendLessThanZero = allowedToSpendValue <= 0;
  const bonusSpendingLessThanZero = bonusSpendingValue < 0;

  const disableBonusInput =
    priceLessThanZero ||
    (allowedToSpendLessThanZero && bonusSpendingLessThanZero) ||
    (!allowedToSpendLessThanZero && !bonusSpendingLessThanZero);

  return (
    <FormProvider {...formApi}>
      <Grid2 container gap={2} flexDirection="column">
        <RHFTextField label="Название тура" name="name" control={control} disabled={disableForm} />
        <RHFTextField label="Описание" name="description" control={control} multiline rows={2} disabled={disableForm} />
        <Grid2 flexDirection="column" container gap={3}>
          <AllowedToSpend id={cardId} price={price || 0} bonuses={bonusSpending || 0} />
          <Grid2 gap={3} container flexDirection="row">
            <Grid2 container flexDirection="column" gap={2}>
              <RHFTextField
                name="price"
                label="Цена"
                control={control}
                currencyFormat
                decimalScale={0}
                disabled={disableForm}
              />
              <RHFTextField
                label="Бонусы"
                name="bonusSpending"
                control={control}
                disabled={!disableBonusInput || disableForm}
                currencyFormat
                decimalScale={0}
              />
            </Grid2>
            <Grid2 container gap={1} flexDirection="column">
              <BonusExpectationComponent id={cardId} price={price || 0} bonuses={bonusSpending || 0} />
              <LabelContainer label="Бонусов будет списано">
                <Typography color="error">{numberFormatToPriceFormat(bonusSpending || 0)}</Typography>
              </LabelContainer>
            </Grid2>
          </Grid2>
        </Grid2>

        <RHFTextField
          label="Статус"
          name="state"
          control={control}
          options={tourStates}
          fullWidth
          disabled={disableForm}
          translateOptions={tourStateStatusesConverted} // Передаем объект перевода
        />
        <Grid2 container gap={3} flexDirection="row" wrap="nowrap" justifyContent="space-between">
          <RHFDatePicker label="Дата отправления" name="fromDate" control={control} disabled={disableForm} />
          <RHFDatePicker label="Дата возвращения" name="toDate" control={control} disabled={disableForm} />
        </Grid2>
        <Typography>
          {formatTourDates(
            fromDate instanceof Date ? new Date() : (fromDate as unknown as Dayjs).toDate(),
            toDate instanceof Date ? new Date() : (toDate as unknown as Dayjs).toDate()
          )}
        </Typography>
      </Grid2>
    </FormProvider>
  );
}
