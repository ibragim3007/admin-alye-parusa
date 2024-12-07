import CardInfoBig from '@/features/cardInfoBig/CardInfoBig';
import { Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import mockCardGetDto from './mock';

export default function TourPage() {
  const { cardId } = useParams();

  // const {} = useGetCa

  return (
    <Grid2
      sx={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto' }}
      container
      flexDirection="column"
      gap={3}
      padding={3}
    >
      <Typography variant="h3">Tour</Typography>
      <CardInfoBig card={mockCardGetDto} />
      {/* <Typography>{JSON.stringify(params)}</Typography> */}
    </Grid2>
  );
}
