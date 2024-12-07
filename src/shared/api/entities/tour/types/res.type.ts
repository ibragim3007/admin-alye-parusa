import { CardStatusType } from '../../card/types/res.type';
import { ContactType, TourStateType } from '../../dictionary/types';

export type TourGetDto = {
  id: number;
  userId: number;
  name: string;
  fromDate: string;
  toDate: string;
  cardId: number;
  price: number;
  finalPrice: number;
  bonusDeposit: number;
  bonusSpending: number;
  state: 'Created';
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TourClientGetDto = {
  card: {
    id: number;
    clientId: number;
    shortName: string;
    cardComment: string;
    cardNumber: number;
    bonusPercentage: number;
    status: CardStatusType;
    createdAt: Date;
  };
  client: {
    id: number;
    comment: string;
    surname: string;
    name: string;
    patronymic: string;
    birthday: Date;
    passportType: string;
    passportSeries: string;
    passportNumber: string;
    phone: string;
    contactType: ContactType;
    contact: string;
    createdAt: Date;
    updatedAt: Date;
  };
  tours: {
    id: number;
    userId: number;
    name: string;
    fromDate: string;
    toDate: string;
    cardId: number;
    price: number;
    finalPrice: number;
    bonusDeposit: number;
    bonusSpending: number;
    state: TourStateType;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
