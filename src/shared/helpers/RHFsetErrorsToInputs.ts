import { isAxiosError } from 'axios';
import { Path, UseFormReturn } from 'react-hook-form';
import { BasicErrorType } from '../utils/axiosErrorHandler';

import { FieldValues } from 'react-hook-form';

export function RHFsetErrorsToInputs<T extends FieldValues>(
  error: Error | null,
  formApi: UseFormReturn<T, any, undefined>
) {
  if (isAxiosError<BasicErrorType>(error)) {
    if (error.response?.data) {
      const { errors } = error.response.data;

      Object.entries(errors).forEach(([field, messages]) => {
        formApi.setError(field as Path<T>, {
          type: 'server',
          message: Array.isArray(messages) ? messages.join(' ') : messages,
        });
      });
    }
  }
}
