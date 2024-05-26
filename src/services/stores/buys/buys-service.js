import { create } from 'zustand';
import { Urls } from '../../../constants';
import { axiosPrivate } from '../../../utils';
import { withLoadingStateHandling } from '../../loading-handling';

export const useBuysStore = create((set) => ({
  buy: null,
  buys: [],
  isLoading: false,

  getBuy: withLoadingStateHandling(async (buyId) => {
    const response = await axiosPrivate.get(`${Urls.ONLINE_BUYS}/${buyId}`);
    await set({ buy: response.data });
  }, set),

  getBuys: withLoadingStateHandling(async (clientId) => {
    const response = await axiosPrivate.get(`${Urls.ONLINE_BUYS}/client/${clientId}`);
    await set({ buys: response.data })
  }, set),

  addBuy: withLoadingStateHandling(async (clientId, buy) => {
    const response = await axiosPrivate.post(`${Urls.ONLINE_BUYS}/${clientId}`, buy);
    await set(({ buys }) => ({ buys: [...buys, response.data] }));
  }, set),

  updateBuy: withLoadingStateHandling(async (buy) => {
    const response = await axiosPrivate.put(Urls.ONLINE_BUYS, buy);
    await set(({ buys }) => ({
      buys: buys.map((item) => (item.id === buy.id ? response.data : item)),
    }));
  }, set),

  deleteBuy: withLoadingStateHandling(async (buyId) => {
    await axiosPrivate.delete(`${Urls.ONLINE_BUYS}/${buyId}`);
    await set(({ buys }) => ({
      buys: buys.filter((item) => item.id !== buyId)
    }));
  }, set),
}));