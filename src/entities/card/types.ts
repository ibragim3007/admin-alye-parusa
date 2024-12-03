import { CardCreateDto } from '@/shared/api/entities/card/types/req.type';
import { CardGetDto } from '@/shared/api/entities/card/types/res.type';

export interface ICard extends CardGetDto {}

export interface ICreateCard extends CardCreateDto {}
