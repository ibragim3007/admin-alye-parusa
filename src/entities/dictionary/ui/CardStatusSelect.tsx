import { useGetCardStatuses } from '@/entities/dictionary/dictionary.repository';
import { CardStatusType } from '@/shared/api/entities/card/types/res.type';
import { CircularProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface CardStatusSelectProps {
  value: CardStatusType;
  onChange: (e: SelectChangeEvent<CardStatusType>) => void;
}

const CardStatusSelect: React.FC<CardStatusSelectProps> = ({ value, onChange }) => {
  const { data, isLoading } = useGetCardStatuses();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Select value={value} onChange={onChange}>
      {data?.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CardStatusSelect;
