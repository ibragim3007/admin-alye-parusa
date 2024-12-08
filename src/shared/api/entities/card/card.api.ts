import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import {
  CardBonusExceptationDto,
  CardBonusSpendingAllowedDto,
  CardChangeStatusDto,
  CardCreateDto,
  CardGetPaginationParams,
} from './types/req.type';
import {
  BonusExpectationResponseDto,
  CardBalanceResponseDto,
  CardGetDto,
  CardsGetPaginationDto,
} from './types/res.type';

export async function getCards(params?: CardGetPaginationParams) {
  return (await api.get<Promise<CardsGetPaginationDto>>(apiConfig.card.get.cards, { params })).data;
}

export async function createCard(payload: CardCreateDto) {
  return (await api.post<Promise<CardGetDto>>(apiConfig.card.post.cards, payload)).data;
}

export async function deleteCard(id: number) {
  return (await api.delete<Promise<CardGetDto>>(apiConfig.card.delete.cardsId(id))).data;
}

export async function getBalance(id: number) {
  return (await api.get<Promise<CardBalanceResponseDto>>(apiConfig.card.get.balance(id))).data;
}

export async function changeCardStatus(id: number, params: CardChangeStatusDto) {
  return (
    await api.post<Promise<CardGetDto>>(apiConfig.card.post.changeStatus(id), null, {
      params,
    })
  ).data;
}

export async function getBonusExpectation(id: number, params: CardBonusExceptationDto) {
  return (await api.get<Promise<BonusExpectationResponseDto>>(apiConfig.card.get.bonusExpectation(id), { params }))
    .data;
}

export async function updateBonusPercentage(id: number, payload: number) {
  return (await api.post<Promise<boolean>>(apiConfig.card.post.updateBonusPercentage(id), payload)).data;
}
