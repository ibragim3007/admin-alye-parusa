import { useGetBonusExpectation } from '@/entities/card/card.respository';
import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import LabelContainer from '@/shared/ui/LabelContainer';
import { WrapTextSkeleton } from '@/shared/ui/loader/WrapTextSkeleton';
import { Typography } from '@mui/material';

export interface AllowedToSpendProps {
  id?: number;
  price?: number;
  bonuses?: number;
}

export default function AllowedToSpend({ id, price, bonuses }: AllowedToSpendProps) {
  const { data, isLoading, isFetching } = useGetBonusExpectation(id, { price: price || 0, bonuses: bonuses || 0 });

  return (
    <LabelContainer
      label="Доступно к списанию:"
      labelProps={{ color: 'textPrimary', fontWeight: 600 }}
      gridProps={{ flexDirection: 'row', container: true, gap: 2, alignItems: 'center' }}
    >
      <WrapTextSkeleton loading={isLoading || isFetching}>
        <Typography>{numberFormatToPriceFormat(data?.allowedToSpend || 0)}</Typography>
      </WrapTextSkeleton>
    </LabelContainer>
  );
}
