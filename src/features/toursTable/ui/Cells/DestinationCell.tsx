import { TourGetDto } from '@/shared/api/entities/tour/types/res.type';
import { getFromToDateString } from '@/shared/helpers/getFromToDateString';
import { Grid2, Typography } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

interface DestinationCellProps {
  tour: TourGetDto;
}

export default function DestinationCell({ tour }: DestinationCellProps) {
  const isBiggerThanNow = new Date(tour.toDate) >= new Date();
  return (
    <Grid2 container justifyContent="flex-start" alignItems="center" height="100%" gap={1}>
      <Typography variant="body2">{getFromToDateString(tour.fromDate, tour.toDate)}</Typography>
      {isBiggerThanNow && <AccessTimeFilledIcon sx={{ color: 'text.primary' }} fontSize="inherit" />}
    </Grid2>
  );
}
