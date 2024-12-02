import { useGetCards } from '@/entities/card/card.respository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2 } from '@mui/material';
import CardItem from './CardItem';

export default function ListOfCards() {
  const { data, isLoading, isError } = useGetCards();

  if (isLoading) return <LoaderGeneral />;

  return (
    <Grid2 container gap={3} flexDirection="column">
      {data?.map((card) => <CardItem key={card.id} card={card} />)}
    </Grid2>
  );
}
