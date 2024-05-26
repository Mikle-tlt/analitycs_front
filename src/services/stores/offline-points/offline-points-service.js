import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useOfflinePointsStore = create((set) => ({
  offlinePoints: null,
  offlinePoint: null,
  isLoading: false,

  getOfflinePoint: withLoadingStateHandling(async (offlinePointId) => {
    const response = await axiosPrivate.get(`${Urls.OFFLINE_POINTS}/${offlinePointId}`);
    await set({ offlinePoint: response.data })
  }, set),

  getOfflinePoints: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.OFFLINE_POINTS);
    await set({ offlinePoints: response.data })
  }, set),

  addOfflinePoint: withLoadingStateHandling(async (offlinePoint) => {
    const response = await axiosPrivate.post(Urls.OFFLINE_POINTS, offlinePoint);
    await set(({ offlinePoints }) => ({ offlinePoints: [...offlinePoints, response.data] }));
  }, set),

  updateOfflinePoint: withLoadingStateHandling(async (offlinePoint) => {
    const response = await axiosPrivate.put(Urls.OFFLINE_POINTS, offlinePoint);
    await set(({ offlinePoints }) => ({
      offlinePoints: offlinePoints.map((item) => item.id === offlinePoint.id ? response.data : item),
    }));
  }, set),

  deleteOfflinePoint: withLoadingStateHandling(async (offlinePointId) => {
    await axiosPrivate.delete(`${Urls.OFFLINE_POINTS}/${offlinePointId}`);
    await set(({ offlinePoints }) => ({
      offlinePoints: offlinePoints.filter((item) => item.id !== offlinePointId)
    }));
  }, set),
}));