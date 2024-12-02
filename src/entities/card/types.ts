import { CardStatusType } from '@/shared/api/entities/card/types/res.type';

export interface ICard {
  id: number;
  cardComment: string;
  cardNumber: number;
  clientId: number;
  client?: {
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
    contactType: 'Telegramm';
    contact: string;
    createdAt: Date;
    updatedAt: Date;
    cards: string[];
  };
  status: CardStatusType;
  stateComment: string;
  bonusPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  tours: {
    id: number;
    clientId: number;
    name: string;
    cardId: number;
    card: string;
    price: number;
    finalPrice: number;
    bonusDeposit: number;
    bonusSpending: number;
    state: 'Created';
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
