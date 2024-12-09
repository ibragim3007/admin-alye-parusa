import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ruRU } from '@mui/x-date-pickers/locales';

const ruLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
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
    <LocalizationProvider localeText={ruLocale} dateAdapter={AdapterDayjs} adapterLocale="de">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            localeText={ruLocale}
            label={label}
            format="DD.MM.YYYY"
            value={field.value ? dayjs(field.value) : dayjs(defaultValue)}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />
    </LocalizationProvider>
  );
}
