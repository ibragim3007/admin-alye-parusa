import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';

interface RHFTextFieldProps {
  name: string;
  label: string;
  control: UseFormReturn<any>['control'];
  fullWidth?: boolean;
  options?: string[];
  onChangeHandler?: (value: any) => void;
  multiline?: boolean;
  rows?: number;
}

export const RHFTextField = ({
  name,
  label,
  control,
  fullWidth = false,
  options,
  onChangeHandler,
  multiline = false,
  rows = 1,
}: RHFTextFieldProps) => {
  if (options) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
              if (onChangeHandler) onChangeHandler(value);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} label={label} fullWidth={fullWidth} />}
            size="small"
          />
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField {...field} label={label} fullWidth={fullWidth} size="small" multiline={multiline} rows={rows} />
      )}
    />
  );
};
