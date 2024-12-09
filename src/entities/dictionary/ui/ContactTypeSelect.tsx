import { useGetContactTypes } from '@/entities/dictionary/dictionary.repository';
import { ContactType } from '@/shared/api/entities/dictionary/types';
import { CircularProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface ContactTypeSelectProps {
  value: ContactType;
  onChange: (e: SelectChangeEvent<ContactType>) => void;
}

const ContactTypeSelect: React.FC<ContactTypeSelectProps> = ({ value, onChange }) => {
  const { data, isLoading } = useGetContactTypes();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Select value={value} onChange={onChange}>
      {data?.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ContactTypeSelect;
