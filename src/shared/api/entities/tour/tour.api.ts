import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import { TourClientGetDto, TourClientQueryParamsDto, TourGetDto } from './types/res.type';
import { ChangeTourStateDto, TourCreateDto, TourUpdateDto } from './types/req.type';

// Получить список туров
export async function getTours() {
  return (await api.get<Promise<TourGetDto[]>>(apiConfig.tour.get.tours)).data;
}

// Создать новый тур
export async function createTour(payload: TourCreateDto) {
  return (await api.post<Promise<TourGetDto>>(apiConfig.tour.post.tours, payload)).data;
}

// Удалить тур
export async function deleteTour(id: number) {
  return (await api.delete<Promise<TourGetDto>>(apiConfig.tour.delete.tour(id))).data;
}

// Получить тур по ID
export async function getTourById(id: number) {
  return (await api.get<Promise<TourGetDto>>(apiConfig.tour.get.tourId(id))).data;
}

// Изменить состояние тура
export async function changeTourState(id: number, params: ChangeTourStateDto) {
  return (await api.put<Promise<TourGetDto>>(apiConfig.tour.put.changeState(id), null, { params })).data;
}

export async function changeTour(id: number, payload: TourUpdateDto) {
  return (await api.put<Promise<TourGetDto>>(apiConfig.tour.put.tour(id), payload)).data;
}

// Получить список туров по клиенту
export async function getToursByClientId(clientId: number, params?: TourClientQueryParamsDto) {
  return (
    await api.get<Promise<TourClientGetDto>>(apiConfig.tour.get.toursByClientId(clientId), {
      params,
    })
  ).data;
}
