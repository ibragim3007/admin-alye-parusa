import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import { MeResDto } from './types/req.type';

export async function getMe() {
  return (await api.get<Promise<MeResDto>>(apiConfig.me.get)).data;
}
