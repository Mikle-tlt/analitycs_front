import { create } from 'zustand';
import axios from '../../../utils/axios/axios';
import { Urls } from '../../../constants';
import { withLoadingStateHandling } from '../../loading-handling';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));

const decodeJwt = (token) => {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload).role.authority;
}

export const useUserStore = create((set) => ({
  loading: false,
  role: decodeJwt(accessToken),
  isAuthenticated: !!accessToken,

  signIn: withLoadingStateHandling(async (user) => {
    const response = await axios.post(Urls.LOGIN, user);
    localStorage.setItem('accessToken', JSON.stringify(response.data));
    await set({ isAuthenticated: true, role: decodeJwt(response.data) })
  }, set),

  logout: () => {
    localStorage.removeItem('accessToken');
  },
}));