import { CardStatusType } from '@/shared/api/entities/card/types/res.type';

export const cardStatusesConverted: Record<CardStatusType, string> = {
  attached: 'Прикреплено',
  frozen: 'Заморожено',
  pending: 'В ожидании',
};
