import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import { Grid2, Typography } from '@mui/material';

interface BonusSellProps {
  bonusDeposit: number;
  bonusSpending: number;
}

export default function BonusSell({ bonusDeposit, bonusSpending }: BonusSellProps) {
  return (
    <Grid2 container alignItems="flex-end" flexDirection="column" justifyContent="center" height="100%">
      <Typography color="success" variant="body1">
        +{numberFormatToPriceFormat(bonusDeposit)}
      </Typography>
      <Typography color="error" variant="caption">
        -{numberFormatToPriceFormat(bonusSpending)}
      </Typography>
    </Grid2>
  );
}
