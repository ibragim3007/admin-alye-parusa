import { IAuthService } from '../api/api';

export class AuthService implements IAuthService {
  setToken(token: string) {
    // localStorage.setItem('localTokenKey', `Basic ${token}`);
    const tokenValue = token && `Basic ${token}`;
    document.cookie = `_auth=${tokenValue}`;
  }

  getToken() {
    // const value = localStorage.getItem('localTokenKey');
    const value = getCookie('_auth');

    if (!value) return '';
    return value;
  }
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};
