import { CardCreateDto } from '@/shared/api/entities/card/types/req.type';
import { CardStatusType } from '@/shared/api/entities/card/types/res.type';

export interface ICard {
  id: number;
  cardComment: string;
  cardNumber: number;
  clientId: number | null;
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
    createdAt: string;
    updatedAt: string;
    cards: string[];
  };
  status: CardStatusType;
  stateComment: string;
  bonusPercentage: number;
  createdAt: string;
  updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface ICreateCard extends CardCreateDto {}
