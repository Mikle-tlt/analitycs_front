import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useRegionsStore = create((set) => ({
  regions: null,
  isLoading: false,

  getRegions: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.REGIONS);
    await set({ regions: response.data })
  }, set),

  addRegion: withLoadingStateHandling(async (name) => {
    const response = await axiosPrivate.post(Urls.REGIONS, { name });
    await set(({ regions }) => ({ regions: [...regions, response.data] }));
  }, set),

  updateRegion: withLoadingStateHandling(async (name, id) => {
    const response = await axiosPrivate.put(Urls.REGIONS, { id, name });
    await set(({ regions }) => ({
      regions: regions.map((item) => item.id === id ? response.data : item),
    }));
  }, set),

  deleteRegion: withLoadingStateHandling(async (regionId) => {
    await axiosPrivate.delete(`${Urls.REGIONS}/${regionId}`);
    await set(({ regions }) => ({
      regions: regions.filter((item) => item.id !== regionId)
    }));
  }, set),
}));