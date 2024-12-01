import { CardStatusType } from './res.type';

export type CardCreateDto = {
  cardNumber: number;
  cardComment: string;
  bonusPercentage: number;
};

export type CardChangeStatusDto = {
  cardStatus: CardStatusType;
};

export type CardBonusExceptationDto = {
  price: number;
};

export type CardBonusSpendingAllowedDto = {
  tourCost: number;
};
