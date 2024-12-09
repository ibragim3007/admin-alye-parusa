export type ClientGetDto = {
  id: number;
  comment: string;
  chatId: number;
  surname: string;
  name: string;
  patronymic: string;
  passportType: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  contactType: 'telegramm';
  contact: string;
  createdAt: string;
  updatedAt: string;
};
