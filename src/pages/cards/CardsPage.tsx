import ListOfCards from '@/features/cards/ListOfCards';
import { Grid2, Typography } from '@mui/material';

export default function CardsPage() {
  return (
    <Grid2 padding={3}>
      <Typography variant="h2">Cards</Typography>
      <ListOfCards />
    </Grid2>
  );
}
