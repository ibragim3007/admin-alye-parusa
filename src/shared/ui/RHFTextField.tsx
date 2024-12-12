import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface RHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: UseFormReturn<T>['control'];
  fullWidth?: boolean;
  options?: string[];
  onChangeHandler?: (value: any) => void;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string;
  currencyFormat?: boolean; // Новый пропс для валюты
  decimalScale?: number; // Количество знаков после запятой
  prefix?: string; // Префикс для валюты, например, "$"
  translateOptions?: Record<string, string>; // Новый пропс для перевода опций
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
  disabled = false,
  helperText,
  value,
  currencyFormat = false,
  decimalScale = 2,
  prefix = '',
  translateOptions,
}: RHFTextFieldProps<T>) => {
  if (options) {
    const translatedOptions = options.map((option) => ({
      label: translateOptions ? translateOptions[option] : option,
      value: option,
    }));
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            value={translatedOptions.find((opt) => opt.value === (value ? value : field.value)) || null}
            onChange={(_, newValue) => {
              field.onChange(newValue?.value);
              if (onChangeHandler) onChangeHandler(newValue?.value);
            }}
            options={translatedOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={helperText || error?.message}
                fullWidth={fullWidth}
              />
            )}
            size="small"
            disabled={disabled}
            style={{ minWidth: 160 }}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {currencyFormat ? (
            <NumericFormat
              value={field.value} // Значение из React Hook Form
              thousandSeparator=" " // Разделитель тысяч
              decimalSeparator="." // Разделитель дробной части
              decimalScale={decimalScale} // Количество знаков после запятой
              fixedDecimalScale // Фиксированное количество знаков после запятой
              prefix={prefix} // Префикс для валюты
              customInput={TextField} // Используем MUI TextField
              label={label}
              error={!!error}
              helperText={helperText || error?.message}
              disabled={disabled}
              fullWidth={fullWidth}
              size="small"
              onValueChange={(values: { floatValue?: number; value: string }) => {
                field.onChange(values.floatValue ?? 0); // Если floatValue отсутствует, используем 0
                if (onChangeHandler) onChangeHandler(values.floatValue ?? 0);
              }}
            />
          ) : (
            <TextField
              {...field}
              value={value || field.value}
              label={label}
              error={!!error}
              helperText={helperText || error?.message}
              disabled={disabled}
              fullWidth={fullWidth}
              size="small"
              multiline={multiline}
              rows={rows}
              onChange={(event) => {
                field.onChange(event.target.value);
                if (onChangeHandler) onChangeHandler(event.target.value);
              }}
            />
          )}
        </>
      )}
    />
  );
};
