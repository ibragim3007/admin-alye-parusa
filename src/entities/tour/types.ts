import { ChangeTourStateDto, TourCreateDto } from '@/shared/api/entities/tour/types/req.type';
import { TourClientGetDto } from '@/shared/api/entities/tour/types/res.type';

export interface ICreateTour extends TourCreateDto {}

export interface IChangeTourState extends ChangeTourStateDto {}

export interface ITourClientGet extends TourClientGetDto {}
