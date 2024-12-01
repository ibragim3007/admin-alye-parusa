import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import { CardStatusesType, ContactType, SortOrderType, TourStateType } from './types';

export async function getCardStatuses() {
  return (await api.get<Promise<CardStatusesType[]>>(apiConfig.dictionary.get.cardStatuses)).data;
}

export async function getContactTypes() {
  return (await api.get<Promise<ContactType[]>>(apiConfig.dictionary.get.contactTypes)).data;
}

export async function getSortOrders() {
  return (await api.get<Promise<SortOrderType[]>>(apiConfig.dictionary.get.sortOrders)).data;
}

export async function getTourStates() {
  return (await api.get<Promise<TourStateType[]>>(apiConfig.dictionary.get.tourStates)).data;
}
