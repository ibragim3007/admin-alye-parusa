import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { priceFormat } from '@/shared/helpers/priceFormat';
import { Grid2, Typography } from '@mui/material';

interface PriceSellProps {
  tour: TourGetDto;
}

export default function PriceSell({ tour }: PriceSellProps) {
  return (
    <Grid2 container alignItems="flex-start" flexDirection="column" justifyContent="center" height="100%">
      <Typography variant="body1">{priceFormat(tour.price)}</Typography>
      <Typography variant="caption" color="textSecondary">
        {priceFormat(tour.finalPrice)}
      </Typography>
    </Grid2>
  );
}
