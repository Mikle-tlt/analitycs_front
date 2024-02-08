import React, {useEffect} from 'react';
import {useUserStore} from "../../services/user/user-service";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useProductsStore} from "../../services/products/products-service";
import {useOfflinePointProductStore} from "../../services/offline-point-products/offline-point-products-service";

const OfflinePointProducts = () => {
  const { offlineProducts, getOfflineProducts, addOfflineProduct,
    deleteOfflineProduct, updateOfflineProduct } = useOfflinePointProductStore();
  const { products, getProducts } = useProductsStore();
  const { user } = useUserStore();
  const { offlinePointId } = useParams();
  const navigate = useNavigate();

  const offlineProductAdd = async (e) => {
    e.preventDefault();
    const offlinePoint = {
      quantity: e.target.quantity.value,
      productId: e.target.productId.value
    };
    await addOfflineProduct(offlinePointId, offlinePoint)
      .then(() => {
        toast.success("Товар для списка наличия успешно добавлен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlineProductEdit = async (e, offlineProductId, productId) => {
    e.preventDefault();
    const offlineProduct = {
      id: offlineProductId,
      quantity: e.target.quantity.value,
      productId: productId
    };
    await updateOfflineProduct(offlineProduct)
      .then(() => {
        toast.success("Товар из списка наличия успешно изменен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlineProductDelete = async(offlineProductId) => {
    await deleteOfflineProduct(offlineProductId)
      .then(() => {
        toast.success("Товар из списка наличия успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getOfflineProducts(offlinePointId);
    getProducts(user.id);
  }, [])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Товары в наличии</span></h1>
          </div>
        </div>
        <form onSubmit={offlineProductAdd}>
          <div className="row">
            <div className="col">
              <select name="productId" className="form-select">
                {products?.map((product) => (
                  <option key={product.id} value={product.id}>{ product.name }</option>
                ))}
              </select>
            </div>
            <div className="col">
              <input className="form-control" type="number" name="quantity" min="1" step="1" max="1000" required
                     placeholder="Количество" />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {(!offlineProducts || offlineProducts.length === 0) && <p>Для данной оффлайн точки товары в наличи не найдены</p>}
        {offlineProducts && offlineProducts.map((offlineProduct) => (
          <form className="mb-2"
                key={offlineProduct.id}
                onSubmit={(e) => offlineProductEdit(e, offlineProduct.id, offlineProduct.productId)}>
            <div className="row">
              <div className="col">
                {products?.map((product) => {
                  if (product.id === offlineProduct.productId) {
                    return (
                      <input
                        key={product.id}
                        type="text"
                        readOnly
                        className="form-control"
                        defaultValue={product.name}
                      />
                    );
                  } return null;
                })}
              </div>
              <div className="col">
                <input className="form-control" type="number" name="quantity" min="1" step="1" max="1000" required
                       placeholder="Количество" defaultValue={offlineProduct.quantity} />
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <a className="btn btn-danger" onClick={() => offlineProductDelete(offlineProduct.id)}>Удалить</a>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default OfflinePointProducts;