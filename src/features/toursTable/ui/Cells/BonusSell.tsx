import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { numberFormatToPriceFormat } from '@/shared/helpers/priceFormat';
import { Grid2, Typography } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
interface BonusSellProps {
  tour: TourGetDto;
}

export default function BonusSell({ tour }: BonusSellProps) {
  const isBiggerThanNow = new Date(tour.toDate) >= new Date();

  return (
    <Grid2 container alignItems="flex-start" flexDirection="column" justifyContent="center" height="100%">
      <Grid2 container alignItems="center" gap={0.5}>
        <Typography color={tour.state === 'canceled' ? 'textSecondary' : 'success'} variant="body1">
          +{numberFormatToPriceFormat(tour.bonusDeposit)}
        </Typography>
        {isBiggerThanNow &&
          (tour.state === 'canceled' ? (
            <AccessTimeFilledIcon sx={{ color: 'text.secondary' }} fontSize="inherit" />
          ) : (
            <AccessTimeFilledIcon fontSize="inherit" color="success" />
          ))}
      </Grid2>
      <Typography color="error" variant="caption">
        -{numberFormatToPriceFormat(tour.bonusSpending)}
      </Typography>
    </Grid2>
  );
}
