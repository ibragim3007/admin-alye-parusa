import { CardStatusType } from '@/shared/api/entities/card/types/res.type';
import { SortOrderType, TourStateType } from '../api/entities/dictionary/types';

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

export const sortOrderTypeCoverted: Record<SortOrderType, string> = {
  ascending: 'По возрастанию',
  notBoundDescending: 'Сначала непривязанные',
  descending: 'По убыванию',
};
