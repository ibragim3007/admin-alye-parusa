import { priceFormat } from '@/shared/helpers/priceFormat';
import { Grid2, Typography } from '@mui/material';

interface PriceSellProps {
  price: number;
  finalPrice: number;
}

export default function PriceSell({ price, finalPrice }: PriceSellProps) {
  return (
    <Grid2 container alignItems="flex-end" flexDirection="column" justifyContent="center" height="100%">
      <Typography variant="body1">{priceFormat(price)}</Typography>
      <Typography variant="caption" color="textSecondary">
        {priceFormat(finalPrice)}
      </Typography>
    </Grid2>
  );
}
