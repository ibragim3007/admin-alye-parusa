import { useGetCards } from '@/entities/card/card.respository';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Pagination, Typography } from '@mui/material';
import CardItem from './CardItem';
import { ClientFormProps } from '../clientForm/ClientForm';
import { useState } from 'react';

interface ListOfCardsProps {
  ClientForm: React.ElementType<ClientFormProps>;
}

export default function ListOfCards({ ClientForm }: ListOfCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const { data, isLoading } = useGetCards({ page: currentPage });

  if (isLoading) return <LoaderGeneral />;

  if (!data) return <Typography>Нет данных</Typography>;

  return (
    <Grid2 container gap={3} flexDirection="column" alignContent="center">
      {(data.cards || []).map((card) => (
        <CardItem key={card.id} card={card} ClientForm={ClientForm} />
      ))}
      <Pagination count={data.totalPages} page={currentPage} onChange={handleChange} />
    </Grid2>
  );
}
