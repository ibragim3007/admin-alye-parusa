import { useGetCards } from '@/entities/card/card.respository';
import { SortOrderType } from '@/shared/api/entities/dictionary/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { Alert, Grid2, Pagination, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientFormProps } from '../clientForm/ClientForm';
import CardItem from './CardItem';
import FilterOrder from './ui/FilterOrder';
import SearchField from './ui/SearchField';

interface ListOfCardsProps {
  ClientForm: React.ElementType<ClientFormProps>;
  pageNumber: number;
}

export default function ListOfCards({ ClientForm, pageNumber }: ListOfCardsProps) {
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [sortType, setSortType] = useState<SortOrderType>('notBoundDescending');
  const handleChangeSortType = (updatedSortType: SortOrderType) => setSortType(updatedSortType);

  const [searchString, setSearchString] = useState('');
  const debouncedSearchString = useDebounce(searchString, 500);
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useGetCards({
    page: pageNumber,
    searchString: debouncedSearchString,
    pageSize: 10,
    sortOrder: sortType,
  });

  const handleChangeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/cards/${value}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    void refetch();
  }, [debouncedSearchString, sortType, pageNumber, refetch]);

  const updateSearchString = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setAmountOfPages(data.totalPages);
    }
  }, [data, isLoading]);

  return (
    <Grid2 container gap={3}>
      <Grid2 gap={2} width={'100%'} container justifyContent="center" alignItems="center">
        <SearchField onChange={updateSearchString} value={searchString} />
        <FilterOrder value={sortType} onChange={handleChangeSortType} />
      </Grid2>

      <Grid2
        maxWidth={800}
        style={{ margin: '0 auto' }}
        gap={3}
        container
        flexDirection="column"
        alignContent="center"
        width={'100%'}
        minHeight={'70vh'}
      >
        {(isLoading || isFetching) && <LoaderGeneral />}
        {(data?.cards || []).length === 0 && !isLoading && (
          <Alert color="info" variant="filled">
            Нет данных
          </Alert>
        )}

        {!isLoading &&
          !isFetching &&
          (data?.cards || []).map((card) => (
            <CardItem
              key={card.id}
              card={card}
              ClientForm={ClientForm}
              params={{ page: pageNumber, searchString: debouncedSearchString, sortOrder: sortType }}
            />
          ))}
      </Grid2>

      <Grid2 width={'100%'} container justifyContent="center">
        <Paper sx={{ p: 1 }}>
          <Pagination count={amountOfPages} page={pageNumber} onChange={handleChangeCurrentPage} />
        </Paper>
      </Grid2>
    </Grid2>
  );
}
