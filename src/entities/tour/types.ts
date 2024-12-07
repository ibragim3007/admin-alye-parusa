import { ChangeTourStateDto, TourCreateDto } from '@/shared/api/entities/tour/types/req.type';

export interface ICreateTour extends TourCreateDto {}

export interface IChangeTourState extends ChangeTourStateDto {}
