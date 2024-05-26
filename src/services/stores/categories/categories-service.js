import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { Urls } from '../../../constants';
import { axiosPrivate } from '../../../utils';

export const useCategoriesStore = create((set) => ({
  categories: null,
  isLoading: false,

  getCategories: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.CATEGORIES);
    await set({ categories: response.data })
  }, set),

  addCategory: withLoadingStateHandling(async (name) => {
    const response = await axiosPrivate.post(Urls.CATEGORIES, { name });
    await set(({ categories }) => ({
      categories: [...categories, response.data]
    }));
  }, set),

  updateCategory: withLoadingStateHandling(async (name, id) => {
    const response = await axiosPrivate.put(Urls.CATEGORIES, { id, name });
    await set(({ categories }) => ({
      categories: categories.map((item) => (item.id === id ? response.data : item)),
    }));
  }, set),

  deleteCategory: withLoadingStateHandling(async (categoryId) => {
    await axiosPrivate.delete(`${Urls.CATEGORIES}/${categoryId}`);
    await set(({ categories }) => ({
      categories: categories.filter((item) => item.id !== categoryId),
    }));
  }, set),
}));