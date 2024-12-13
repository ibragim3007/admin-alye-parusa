import { useGetBonusExpectation } from '@/entities/card/card.respository';
import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import LabelContainer from '@/shared/ui/LabelContainer';
import { WrapTextSkeleton } from '@/shared/ui/loader/WrapTextSkeleton';
import { Typography } from '@mui/material';

export interface BonusExpectationProps {
  id?: number;
  price?: number;
  bonuses?: number;
  tourId?: number;
}

export default function BonusExpectation({ id, price, tourId }: BonusExpectationProps) {
  const { data, isLoading, isFetching } = useGetBonusExpectation(id, { price: price || 0, bonuses: 0, tourId: tourId });

  return (
    <LabelContainer label="Бонусов к начислению">
      <WrapTextSkeleton loading={isLoading || isFetching}>
        <Typography>{numberFormatToPriceFormat(data?.expectation || 0)}</Typography>
      </WrapTextSkeleton>
    </LabelContainer>
  );
}
