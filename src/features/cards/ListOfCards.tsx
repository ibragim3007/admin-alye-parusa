import { useGetCards } from '@/entities/card/card.respository';
import { useDebounce } from '@/shared/hooks/useDebounce';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Grid2, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { ClientFormProps } from '../clientForm/ClientForm';
import CardItem from './CardItem';
import SearchField from './ui/SearchField';

interface ListOfCardsProps {
  ClientForm: React.ElementType<ClientFormProps>;
}

export default function ListOfCards({ ClientForm }: ListOfCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState('');
  const debouncedSearchString = useDebounce(searchString, 500); // Устанавливаем задержку в 500 мс
  const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value);

  const { data, isLoading } = useGetCards({ page: currentPage, searchString: debouncedSearchString });
  const updateSearchString = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <Grid2 container gap={3} flexDirection="column" alignContent="center">
      {/* <TextField onChange={updateSearchString} label="Поиск" style={{ alignSelf: 'center', minWidth: 300 }} /> */}
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
        <Pagination count={data?.totalPages} page={currentPage} onChange={handleChangeCurrentPage} />
      </Grid2>
    </Grid2>
  );
}
