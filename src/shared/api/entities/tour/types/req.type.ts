import { TourStateType } from '../../dictionary/types';

export class TourCreateDto {
  state: TourStateType;
  cardId: number;
  name: string;
  price: number;
  bonusSpending: number;
  description: string;
  fromDate: Date;
  toDate: Date;

  constructor(
    state: TourStateType,
    cardId: number,
    name: string,
    price: number,
    bonusSpending: number,
    description: string,
    fromDate: Date,
    toDate: Date
  ) {
    this.state = state;
    this.cardId = cardId;
    this.name = name;
    this.price = price;
    this.bonusSpending = bonusSpending;
    this.description = description;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}

export interface TourUpdateDto {
  state: TourStateType;
  name: string;
  description: string;
  fromDate: Date;
  toDate: Date;
  price: number;
  bonusSpending: number;
}

export type ChangeTourStateDto = {
  tourState: TourStateType;
};
