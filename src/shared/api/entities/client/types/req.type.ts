import { ContactType } from '../../dictionary/types';

export type ClientDto = {
  id: number;
  chatId: number;
  birthday: string | null;
  createdAt: string;
  updatedAt: string;

  comment: string;
  surname: string;
  name: string;
  patronymic: string;
  passportType: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  contactType: ContactType;
  contact: string;
};

export type ClientCreateDto = {
  comment: string;
  surname: string;
  name: string;
  patronymic: string;
  passportType: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  contactType: ContactType;
  contact: string;
};

export type ClientUpdateDto = {
  comment: string;
  surname: string;
  name: string;
  patronymic: string;
  passportType: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  contactType: ContactType;
  contact: string;
};

export type ClientCreateParams = {
  cardId: string;
};
