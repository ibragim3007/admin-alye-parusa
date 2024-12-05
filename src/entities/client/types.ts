import { ClientCreateDto, ClientUpdateDto } from '@/shared/api/entities/client/types/req.type';

export interface IClientCreate extends ClientCreateDto {}

export interface IEditClient extends ClientUpdateDto {}
