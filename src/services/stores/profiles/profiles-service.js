import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';
import axios from '../../../utils/axios/axios';

export const useProfilesStore = create((set) => ({
  profiles: null,
  isLoading: false,

  getProfiles: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.PROFILES);
    await set({ profiles: response.data })
  }, set),

  addProfile: withLoadingStateHandling(async (user) => {
    const response = await axios.post(Urls.REGISTRATION, user);
    await set(({ profiles }) => ({
      profiles: [...profiles, response.data]
    }));
  }, set),

  updateProfile: withLoadingStateHandling(async (role, id) => {
    const response = await axiosPrivate.put(Urls.PROFILES, { id, role });
    await set(({ profiles }) => ({
      profiles: profiles.map((item) => item.id === id ? response.data : item),
    }));
  }, set),

  deleteProfile: withLoadingStateHandling(async (userId) => {
    await axiosPrivate.delete(`${Urls.PROFILES}/${userId}`);
    await set(({ profiles }) => ({
      profiles: profiles.filter((item) => item.id !== userId)
    }));
  }, set),
}));