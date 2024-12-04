import { useGetCards } from '@/entities/card/card.respository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2 } from '@mui/material';
import CardItem from './CardItem';
import { ClientFormProps } from '../clientForm/ClientForm';

interface ListOfCardsProps {
  ClientForm: React.ElementType<ClientFormProps>;
}

export default function ListOfCards({ ClientForm }: ListOfCardsProps) {
  const { data, isLoading } = useGetCards();

  if (isLoading) return <LoaderGeneral />;

  return (
    <Grid2 container gap={3} flexDirection="column" alignContent="center">
      {data?.map((card) => <CardItem key={card.id} card={card} ClientForm={ClientForm} />)}
    </Grid2>
  );
}
