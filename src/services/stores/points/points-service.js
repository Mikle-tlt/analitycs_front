import { create } from 'zustand';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';
import { withLoadingStateHandling } from '../../loading-handling';

export const usePointsStore = create((set) => ({
  points: null,
  isLoading: false,

  getPoints: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.POINTS);
    await set({ points: response.data })
  }, set),

  addPoint: withLoadingStateHandling(async (point) => {
    const response = await axiosPrivate.post(Urls.POINTS, point);
    await set(({ points }) => ({ points: [...points, response.data] }));
  }, set),

  updatePoint: withLoadingStateHandling(async (point) => {
    const response = await axiosPrivate.put(Urls.POINTS, point);
    await set(({ points }) => ({
      points: points.map((item) => item.id === point.id ? response.data : item),
    }));
  }, set),

  deletePoint: withLoadingStateHandling(async (pointId) => {
    await axiosPrivate.delete(`${Urls.POINTS}/${pointId}`);
    await set(({ points }) => ({
      points: points.filter((item) => item.id !== pointId)
    }));
  }, set),
}));