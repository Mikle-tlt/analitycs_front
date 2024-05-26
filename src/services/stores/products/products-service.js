import { create } from 'zustand';
import { withLoadingStateHandling } from '../../loading-handling';
import { axiosPrivate } from '../../../utils';
import { Urls } from '../../../constants';

export const useProductsStore = create((set) => ({
  products: null,
  isLoading: false,

  getProducts: withLoadingStateHandling(async () => {
    const response = await axiosPrivate.get(Urls.PRODUCTS);
    await set({ products: response.data })
  }, set),

  addProduct: withLoadingStateHandling(async (product) => {
    const response = await axiosPrivate.post(Urls.PRODUCTS, product);
    await set(({ products }) => ({ products: [...products, response.data] }));
  }, set),

  updateProduct: withLoadingStateHandling(async (product) => {
    const response = await axiosPrivate.put(Urls.PRODUCTS, product);
    await set(({ products }) => ({
      products: products.map((item) => item.id === product.id ? response.data : item),
    }));
  }, set),

  deleteProduct: withLoadingStateHandling(async (productId) => {
    await axiosPrivate.delete(`${Urls.PRODUCTS}/${productId}`);
    await set(({ products }) => ({
      products: products.filter((item) => item.id !== productId)
    }));
  }, set),
}));