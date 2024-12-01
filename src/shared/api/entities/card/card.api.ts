import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import {
  CardBonusExceptationDto,
  CardBonusSpendingAllowedDto,
  CardChangeStatusDto,
  CardCreateDto,
} from './types/req.type';
import { CardGetDto } from './types/res.type';

export async function getCards() {
  return (await api.get<Promise<CardGetDto[]>>(apiConfig.card.get.cards)).data;
}

export async function createCard(payload: CardCreateDto) {
  return (await api.post<Promise<CardGetDto>>(apiConfig.card.post.cards, payload)).data;
}

export async function deleteCard(id: number) {
  return (await api.post<Promise<CardGetDto>>(apiConfig.card.delete.cardsId(id))).data;
}

export async function getBalance(id: number) {
  return (await api.get<Promise<CardGetDto[]>>(apiConfig.card.get.balance(id))).data;
}

export async function changeCardStatus(id: number, params: CardChangeStatusDto) {
  return (
    await api.post<Promise<CardGetDto>>(apiConfig.card.post.changeStatus(id), null, {
      params,
    })
  ).data;
}

export async function getBonusExpectation(id: number, params: CardBonusExceptationDto) {
  return (await api.get<Promise<number>>(apiConfig.card.get.bonusExpectation(id), { params })).data;
}

export async function getBonusSpendingAllowed(id: number, params: CardBonusSpendingAllowedDto) {
  return (await api.get<Promise<number>>(apiConfig.card.get.bonusSpendingAllowed(id), { params })).data;
}

export async function updateBonusPercentage(id: number, payload: number) {
  return (await api.post<Promise<boolean>>(apiConfig.card.post.updateBonusPercentage(id), payload)).data;
}
