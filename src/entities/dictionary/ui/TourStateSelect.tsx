import { useGetTourStates } from '@/entities/dictionary/dictionary.repository';
import { TourStateType } from '@/shared/api/entities/dictionary/types';
import LoaderGeneral from '@/shared/ui/LoaderGeneral';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface TourStateSelectProps {
  value: TourStateType;
  onChange: (e: SelectChangeEvent<TourStateType>) => void;
}

const TourStateSelect: React.FC<TourStateSelectProps> = ({ value, onChange }) => {
  const { data, isLoading } = useGetTourStates();

  if (isLoading) {
    return <LoaderGeneral />;
  }

  return (
    <Select value={value} onChange={onChange}>
      {data?.map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TourStateSelect;
