import ListOfCards from '@/features/cards/ListOfCards';
import { ClientForm } from '@/features/clientForm';
import { CreateCard } from '@/features/createCard';
import { Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function CardsPage() {
  const { pageNumber } = useParams();

  return (
    <Grid2
      sx={{ bgcolor: 'background.default', minHeight: '100vh' }}
      container
      flexDirection="column"
      gap={3}
      padding={3}
    >
      <Grid2 container justifyContent="space-between">
        <Typography variant="h3">Карты</Typography>
        <CreateCard />
      </Grid2>
      <ListOfCards pageNumber={parseInt(pageNumber || '1')} ClientForm={ClientForm} />
    </Grid2>
  );
}
