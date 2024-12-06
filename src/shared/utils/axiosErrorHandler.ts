import axios, { AxiosError } from 'axios';

export interface BasicErrorType {
  errors: {
    [key: string]: string[];
  };
  title: string;
}

export interface BasicSingleErrorType {
  error: string;
}

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
