import React, {useEffect} from 'react';
import {useOfflineDetailsStore} from "../../services/offline-details/offline-details-service";
import {useNavigate, useParams} from "react-router-dom";
import {useUserStore} from "../../services/user/user-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useProductsStore} from "../../services/products/products-service";
import {useOfflinePointProductStore} from "../../services/offline-point-products/offline-point-products-service";
import {useOfflineBuysStore} from "../../services/offline-buys/offline-buys-service";

const OfflineDetails = () => {
  const { offlineDetails, addOfflineDetail, deleteOfflineDetail, getOfflineDetails } = useOfflineDetailsStore();
  const { offlinePointId, offlineBuyId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { offlineProducts, getOfflineProducts } = useOfflinePointProductStore();
  const { products, getProducts } = useProductsStore();
  const { offlineBuy, getOfflineBuy } = useOfflineBuysStore();

  const offlineDetailAdd = async (e) => {
    e.preventDefault();
    const details = {
      productId: e.target.productId.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value
    }
    await addOfflineDetail(offlineBuyId, details)
      .then(() => {
        toast.success("Товар был успешно добавлен в список проданных!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlineDetailDelete = async(offlineDetailsId) => {
    await deleteOfflineDetail(offlineDetailsId)
      .then(() => {
        toast.success("Товар был успешно удален из списка проданных!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getOfflineDetails(offlineBuyId);
    getOfflineBuy(offlineBuyId)
    getOfflineProducts(offlinePointId);
    getProducts(user.id)
  }, [])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Детали</span></h1>
          </div>
        </div>
        {offlineBuy && (
          <>
            <div className="row text-center">
              <div className="col">
                <p className="lead">{ offlineBuy.date }</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="lead">Выручка: <span>{ offlineBuy.revenue }</span></p>
              </div>
              <div className="col">
                <p className="lead">Затраты на закупку: <span>{ offlineBuy.costPrice }</span></p>
              </div>
              <div className="col">
                <p className="lead">Прибыль: <span>{ offlineBuy.different }</span></p>
              </div>
            </div>
          </>
        )}
        <hr />
          <form onSubmit={offlineDetailAdd}>
            <div className="row">
              <div className="col">
                <select name="productId" className="form-select">
                  {offlineProducts?.map((offlineProduct) => {
                    const product = products?.find((item) => item.id === offlineProduct.productId);
                    if (product) {
                      return (
                        <option key={offlineProduct.id} value={offlineProduct.id}>{ product.name }</option>
                      )
                    }
                  })}
                </select>
              </div>
              <div className="col-auto">
                <input className="form-control" type="number" name="quantity" min="1" step="1"
                       placeholder="Количество" max="1000" required />
              </div>
              <div className="col">
                <input className="form-control" type="number" name="price" min="1" step="0.1" max="1000" required
                       placeholder="Цена" />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">Добавить</button>
              </div>
            </div>
          </form>
          <hr />
            <div>
              <div className="row mb-2">
                <div className="col">
                  <p className="lead text-center" style={{ fontWeight: "800" }}>Наименование</p>
                </div>
                <div className="col">
                  <p className="lead text-center" style={{ fontWeight: "800" }}>Количество</p>
                </div>
                <div className="col">
                  <p className="lead text-center" style={{ fontWeight: "800" }}>Стоимость</p>
                </div>
              </div>
              <hr />
              {(!offlineDetails || offlineDetails.length === 0) && <p>У продажи нет проданных товаров!</p>}
              {offlineDetails && offlineDetails.map((offlineDetail) => (
                <div className="mb-2" key={offlineDetail.id}>
                  <div className="row">
                    <div className="col">
                      {products?.map((product) => {
                        if (offlineDetail.productId === product.id) {
                          return (
                            <input key={product.id}
                                   className="form-control"
                                   type="text"
                                   defaultValue={product.name}
                                   readOnly />
                          )
                        }
                      })}
                    </div>
                    <div className="col">
                      <input className="form-control" type="number" defaultValue={offlineDetail.quantity} readOnly />
                    </div>
                    <div className="col">
                      <input className="form-control" type="number" defaultValue={offlineDetail.price} readOnly />
                    </div>
                    <div className="col-auto">
                      <a className="btn btn-danger" onClick={() => offlineDetailDelete(offlineDetail.id)}>Удалить</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </section>
  );
};

export default OfflineDetails;