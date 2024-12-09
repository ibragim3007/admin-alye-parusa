import React from 'react';
import { useGetSortOrders } from '@/entities/dictionary/dictionary.repository';
import { Select, MenuItem, CircularProgress, SelectChangeEvent } from '@mui/material';
import { SortOrderType } from '@/shared/api/entities/dictionary/types';

interface SortOrderSelectProps {
  value: SortOrderType;
  onChange: (e: SelectChangeEvent<SortOrderType>) => void;
}

const SortOrderSelect: React.FC<SortOrderSelectProps> = ({ value, onChange }) => {
  const { data, isLoading } = useGetSortOrders();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Select value={value} onChange={onChange}>
      {data?.map((order) => (
        <MenuItem key={order} value={order}>
          {order}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortOrderSelect;
