import { CardStatusType } from './res.type';

export type CardGetPaginationParams = {
  searchString?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
};

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
  bonuses: number;
  tourId?: number;
};

export type CardBonusSpendingAllowedDto = {
  tourCost: number;
};
