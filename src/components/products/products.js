import React, {useEffect, useState} from 'react';
import {useProductsStore} from "../../services/products/products-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {useCategoriesStore} from "../../services/categories/categories-service";

const Products = () => {
  const { products, addProduct, deleteProduct, getProducts, updateProduct } = useProductsStore();
  const { user } = useUserStore();
  const { categories, getCategories } = useCategoriesStore();
  const navigate = useNavigate();
  const [updatedProducts, setUpdatedProducts] = useState([]);

  const productAdd = async (e) => {
    e.preventDefault();
    const product = {
      name: e.target.name.value,
      price: e.target.price.value,
      categoryId: e.target.categoryId.value
    };
    await addProduct(user.id, product)
      .then(() => {
        toast.success("Продукт успешно добавлен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const productEdit = async (e, productId, categoryId) => {
    e.preventDefault();
    const product = {
      id: productId,
      name: e.target.name.value,
      price: e.target.price.value,
      categoryId: updatedProducts[productId]?.categoryId || categoryId
    };

    await updateProduct(product)
      .then(() => {
        toast.success("Продукт успешно изменен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const productDelete= async (productId) => {
    await deleteProduct(productId)
      .then(() => {
        toast.success("Продукт успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const handleCategoryChange = (productId, event) => {
    const newProducts = [...updatedProducts];
    newProducts[productId] = { ...newProducts[productId], categoryId: event.target.value };
    setUpdatedProducts(newProducts);
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getProducts(user.id);
    getCategories(user.id);
  }, [user.id, getProducts, getCategories])

  useEffect(() => {
    setUpdatedProducts([]);
  }, [products])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Товары</span></h1>
          </div>
        </div>
        <form onSubmit={(e) => productAdd(e)}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="name" placeholder="Имя" required />
            </div>
            <div className="col">
              <select className="form-select" name="categoryId" required>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>{ category.name }</option>
                ))}
              </select>
            </div>
            <div className="col">
              <input className="form-control" type="number" name="price" min="1" max="10000" step="0.1"
                     placeholder="Себестоимость (BYN, руб.)" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {!products && <p>Товары не найдены</p>}
        {products && products.map((product) => (
            <form key={product.id} className="mb-2"
                  onSubmit={(e) => productEdit(e, product.id, product.categoryId)}>
              <div className="row">
                <div className="col">
                  <input className="form-control" type="text" name="name" defaultValue={product.name} />
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    name="role"
                    required
                    value={updatedProducts[product.id]?.categoryId || product.categoryId}
                    onChange={(e) => handleCategoryChange(product.id, e)}
                  >
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>{ category.name }</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <input className="form-control" type="number" name="price" min="1" max="10000" step="0.1"
                         placeholder="Себестоимость (BYN, руб.)" defaultValue={product.price} required />
                </div>
                <div className="col-auto">
                  <button className="btn btn-info" type="submit">Обновить</button>
                </div>
                <div className="col-auto">
                  <a className="btn btn-danger" onClick={() => productDelete(product.id)}>Удалить</a>
                </div>
              </div>
            </form>
        ))}
      </div>
    </section>
  );
};

export default Products;