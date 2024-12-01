import { apiConfig } from '@/shared/config/apiConfig';
import { api } from '../../api';
import { ClientGetDto } from './types/res.type';
import { ClientCreateDto, ClientUpdateDto } from './types/req.type';

export async function getClients() {
  return (await api.get<Promise<ClientGetDto[]>>(apiConfig.client.get.clients)).data;
}

export async function createClient(payload: ClientCreateDto) {
  return (await api.post<Promise<ClientGetDto>>(apiConfig.client.post.clients, payload)).data;
}

export async function deleteClient(id: number) {
  return (await api.delete<Promise<void>>(apiConfig.client.delete.clientId(id))).data;
}

export async function getClientById(id: number) {
  return (await api.get<Promise<ClientGetDto>>(apiConfig.client.get.clientId(id))).data;
}

export async function updateClient(id: number, payload: ClientUpdateDto) {
  return (await api.put<Promise<ClientGetDto>>(apiConfig.client.put.clientId(id), payload)).data;
}
