import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, TextField } from '@mui/material';
import dayjs from 'dayjs';

interface RHFDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: UseFormReturn<T>['control'];
  label: string;
  defaultValue?: Date;
  disabled?: boolean;
}

export default function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue = new Date(),
  disabled = false,
}: RHFDatePickerProps<T>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : dayjs(defaultValue)}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />
    </LocalizationProvider>
  );
}
