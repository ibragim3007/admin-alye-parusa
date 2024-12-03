export type CardStatusType = 'pending' | 'frozen' | 'attached';

export type CardGetDto = {
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
};

export type CardBalanceResponseDto = {
  cardId: number;
  total: number;
  bonusesAwaiting: {
    count: number;
    date: Date;
  };
};
