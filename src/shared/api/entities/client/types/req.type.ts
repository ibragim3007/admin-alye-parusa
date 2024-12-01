export type ClientCreateDto = {
  comment: string;
  surname: string;
  name: string;
  patronymic: string;
  passportType: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  contactType: 'Telegramm';
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
  contactType: 'Telegramm';
  contact: string;
};
