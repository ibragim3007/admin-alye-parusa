export type TourCreateDto = {
  state: 'Created';
  cardId: number;
  name: string;
  price: number;
  bonusSpending: number;
  description: string;
};

export type ChangeTourStateDto = {
  tourState: string;
};
