import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

const ruLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
interface RHFDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: UseFormReturn<T>['control'];
  label: string;
  defaultValue?: Date;
  disabled?: boolean;
  disableFuture?: boolean;
}

export default function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue = undefined,
  disableFuture,
  disabled = false,
}: RHFDatePickerProps<T>) {
  return (
    <LocalizationProvider localeText={ruLocale} dateAdapter={AdapterDayjs} adapterLocale="de">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <span>
            <DatePicker
              {...field}
              disableFuture={disableFuture}
              localeText={ruLocale}
              label={label}
              disabled={disabled}
              format="DD.MM.YYYY"
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(newValue) => field.onChange(newValue)}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message,
                  size: 'small',
                },
              }}
            />
          </span>
        )}
      />
    </LocalizationProvider>
  );
}
