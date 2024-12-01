export type TourGetDto = {
  id: number;
  userId: number;
  name: string;
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
