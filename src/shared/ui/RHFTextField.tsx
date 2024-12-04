import React from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';

interface RHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: UseFormReturn<T>['control'];
  fullWidth?: boolean;
  options?: string[];
  onChangeHandler?: (value: any) => void;
  multiline?: boolean;
  rows?: number;
}

export const RHFTextField = <T extends FieldValues>({
  name,
  label,
  control,
  fullWidth = false,
  options,
  onChangeHandler,
  multiline = false,
  rows = 1,
}: RHFTextFieldProps<T>) => {
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
