import { useGetCards } from '@/entities/card/card.respository';
import { useDebounce } from '@/shared/hooks/useDebounce';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClientFormProps } from '../clientForm/ClientForm';
import CardItem from './CardItem';
import SearchField from './ui/SearchField';

interface ListOfCardsProps {
  ClientForm: React.ElementType<ClientFormProps>;
}

export default function ListOfCards({ ClientForm }: ListOfCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [searchString, setSearchString] = useState('');
  const debouncedSearchString = useDebounce(searchString, 500);
  const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value);

  const { data, isLoading } = useGetCards({ page: currentPage, searchString: debouncedSearchString, pageSize: 10 });
  const updateSearchString = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setAmountOfPages(data.totalPages);
    }
  }, [data, isLoading]);

  return (
    <Grid2 container gap={3} flexDirection="column" alignContent="center">
      <SearchField onChange={updateSearchString} value={searchString} />

      <Grid2 gap={3} container flexDirection="column" alignContent="center" width={'100%'} minHeight={'70vh'}>
        {isLoading && <LoaderGeneral />}
        {!data && !isLoading && <Typography>Нет данных</Typography>}
        {(data?.cards || []).map((card) => (
          <CardItem
            key={card.id}
            card={card}
            ClientForm={ClientForm}
            params={{ page: currentPage, searchString: debouncedSearchString }}
          />
        ))}
      </Grid2>
      <Grid2 container justifyContent="center">
        <Pagination count={amountOfPages} page={currentPage} onChange={handleChangeCurrentPage} />
      </Grid2>
    </Grid2>
  );
}
