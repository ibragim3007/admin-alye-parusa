import { ContactType } from '../../dictionary/types';

export type CardStatusType = 'pending' | 'frozen' | 'attached';

export type CardsGetPaginationDto = {
  cards: CardGetDto[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};

export type CardGetDto = {
  id: number;
  shortName: string;
  cardComment: string;
  cardNumber: number;
  clientId: number | null;
  status: CardStatusType;

  bonusPercentage: number;
  createdAt: string;
  updatedAt: string;
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
    contactType: ContactType;
    contact: string;
    createdAt: string;
    updatedAt: string;
    cards: string[];
  };
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
};

export type CardBalanceResponseDto = {
  cardId: number;
  total: number;
  bonusesAwaiting: {
    count: number;
    date: Date;
  };
};
