import { IAuthService } from '../api/api';

export class AuthService implements IAuthService {
  setToken(token: string) {
    const tokenValue = token && `Basic ${token}`;
    document.cookie = `_auth=${tokenValue}`;
  }

  getToken() {
    const value = getCookie('_auth');

    if (!value) return '';
    return value;
  }

  removeToken() {
    document.cookie = '_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }
}

export function generateToken(str: string) {
  return btoa(str);
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};
