import { BasicErrorType } from '@/shared/utils/axiosErrorHandler';
import { isAxiosError } from 'axios';
import { Logger, LoggerStrategy } from 'logger-service-ts';
import { ToastOptions, toast } from 'react-toastify';

class ToastLogger<TOptions> implements LoggerStrategy<TOptions> {
  log<TMessage>(message: TMessage, options?: TOptions) {
    if (typeof message === 'string') toast(message, options || {});
  }

  error<TError>(e: TError, options?: TOptions) {
    if (isAxiosError<BasicErrorType>(e)) {
      if (e.response?.data.errors) {
        let errorString = '\n';
        const errorsKeys = Object.keys(e.response?.data.errors);
        errorsKeys.map((keyError) => {
          errorString = errorString + e.response?.data.errors[keyError].join('\n');
        });

        toast.error(errorString);
      } else if (e.response?.data && typeof e.response.data === 'string') toast.error(e.response.data);
      else if (e.response?.data.title) toast.error(e.response.data.title);
    } else if (e instanceof Error) toast.error(e.message, options || {});
    else if (typeof e === 'string') toast.error(e, options || {});
    else {
      toast.error('Неизвестная ошибка');
    }
  }

  success<TMessage>(message: TMessage, options?: TOptions) {
    if (typeof message === 'string') toast.success(message, options || {});
  }
}

export const Inform = new Logger<ToastOptions>([new ToastLogger()]);
