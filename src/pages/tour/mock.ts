import { CardGetDto } from '@/shared/api/entities/card/types/res.type';

const mockCardGetDto: CardGetDto = {
  id: 1,
  shortName: 'Gold Card',
  cardComment: 'VIP клиент',
  cardNumber: 123456789,
  clientId: 1,
  status: 'attached', // Укажите подходящий тип статуса, если `CardStatusType` является enum или строкой.
  bonusPercentage: 10,
  createdAt: '2024-12-01T12:00:00.000Z',
  updatedAt: '2024-12-05T15:30:00.000Z',
  client: {
    id: 1,
    comment: 'Постоянный клиент',
    chatId: 12345678,
    surname: 'Иванов',
    name: 'Иван',
    patronymic: 'Иванович',
    passportType: 'Internal',
    passportSeries: '1234',
    passportNumber: '567890',
    phone: '+79991234567',
    contactType: 'email', // Укажите тип `ContactType`, если это enum.
    contact: 'ivanov@mail.com',
    createdAt: '2024-11-01T08:00:00.000Z',
    updatedAt: '2024-12-01T10:00:00.000Z',
    cards: ['Gold Card', 'Silver Card'],
  },
  tours: [
    {
      id: 1,
      clientId: 1,
      name: 'Путешествие в Италию',
      cardId: 1,
      card: 'Gold Card',
      price: 100000,
      finalPrice: 95000,
      bonusDeposit: 5000,
      bonusSpending: 2000,
      state: 'Created',
      description: 'Тур в Италию с посещением Рима и Венеции.',
      createdAt: '2024-11-25T14:00:00.000Z',
      updatedAt: '2024-12-01T09:00:00.000Z',
    },
    {
      id: 2,
      clientId: 1,
      name: 'Путешествие в Японию',
      cardId: 1,
      card: 'Gold Card',
      price: 150000,
      finalPrice: 140000,
      bonusDeposit: 10000,
      bonusSpending: 5000,
      state: 'Created',
      description: 'Тур в Японию с посещением Токио и Киото.',
      createdAt: '2024-11-28T10:00:00.000Z',
      updatedAt: '2024-12-03T11:00:00.000Z',
    },
  ],
};

export default mockCardGetDto;
