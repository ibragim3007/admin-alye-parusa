import { CardStatusType } from '@/shared/api/entities/card/types/res.type';
import { TourStateType } from '../api/entities/dictionary/types';

export const cardStatusesConverted: Record<CardStatusType, string> = {
  attached: 'Активирована',
  frozen: 'Заморожена',
  pending: 'Создана',
};

export const tourStateStatusesConverted: Record<TourStateType, string> = {
  approved: 'подтвержден',
  canceled: 'отменен',
  deleted: 'удален',
  created: 'не оплачен',
};
