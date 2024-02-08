import React, {useEffect, useState} from 'react';
import {useDetailsStore} from "../../services/details/details-service";
import {useNavigate, useParams} from "react-router-dom";
import {useProductsStore} from "../../services/products/products-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useBuysStore} from "../../services/buys/buys-service";
import {useUserStore} from "../../services/user/user-service";

const Details = () => {
  const { details, deleteDetail, addDetail, updateDetail, getDetails } = useDetailsStore();
  const { products, getProducts } = useProductsStore();
  const { buy, getBuy } = useBuysStore();
  const navigate = useNavigate();
  const { buyId } = useParams();
  const { user } = useUserStore();
  const [updatedQuantities, setUpdatedQuantities] = useState([]);

  const detailAdd = async (e) => {
    e.preventDefault();
    const detail = {
      productId: e.target.productId.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
    }
    await addDetail(buyId, detail)
      .then(() => {
        toast.success("Товар успешно добавлен в покупку!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const detailEdit = async (e, detailInfo) => {
    e.preventDefault();
    const detail = {
      id: detailInfo.id,
      productId: detailInfo.productId,
      quantity: updatedQuantities[detailInfo.id]?.quantity || detailInfo.quantity,
      price: e.target.price.value,
    }
    await updateDetail(detail)
      .then(() => {
        toast.success("Данные товара из покупки успешно обновлены!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const detailDelete = async(detailId) => {
    await deleteDetail(detailId)
      .then(() => {
        toast.success("Товар из покупки успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const handleQuantityChange = (detailId, event) => {
    const newQuantities = [...updatedQuantities];
    newQuantities[detailId] = { ...newQuantities[detailId], quantity: event.target.value };
    setUpdatedQuantities(newQuantities);
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getDetails(buyId)
    getProducts(user.id)
  }, [buyId, user.id, getDetails, getProducts])

  useEffect(() => {
    getBuy(buyId);
  }, [details, buyId, getBuy]);

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Детали</span></h1>
          </div>
        </div>
        {buy && (
          <>
            <div className="row">
              <div className="col text-center">
                <p className="lead">{ buy.date }</p>
              </div>
              <div className="col text-center">
                <p className="lead">{ buy.pointAddress }</p>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <p className="lead">Выручка: <span>{ buy.revenue }</span></p>
              </div>
              <div className="col text-center">
                <p className="lead">Себестоимость: <span>{ buy.costPrice }</span></p>
              </div>
              <div className="col text-center">
                <p className="lead">Прибыль: <span>{ buy.different }</span></p>
              </div>
            </div>
          </>
        )}
        <hr />
        <form onSubmit={detailAdd}>
          <div className="row">
            <div className="col">
              <select name="productId" className="form-select">
                {products?.map((product) => (
                  <option key={product.id} value={product.id}>{ product.name }</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <input className="form-control" type="number" name="quantity" min="1" step="1"
                     placeholder="Количество" max="1000" required />
            </div>
            <div className="col-auto">
              <input className="form-control" type="number" name="price" min="1" step="0.1"
                     max="50000" placeholder="Цена" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        <div className="row">
          <div className="col text-center">
            <label className="form-label" style={{fontWeight: '800'}}>Наименование</label>
          </div>
          <div className="col text-center">
            <label className="form-label" style={{fontWeight: '800'}}>Количество</label>
          </div>
          <div className="col text-center">
            <label className="form-label" style={{fontWeight: '800'}}>Цена</label>
          </div>
        </div>
        {(!details || details.length === 0) && <p>Для данной покупки приобретенные товары не найдены</p>}
        {details && details.map((detail) => (
          <form key={detail.id} className="mb-2" onSubmit={(e) => detailEdit(e, detail)}>
            <div className="row">
              <div className="col">
                {products?.map((product) => {
                  if (product.id === detail.productId) {
                    return <option key={product.id} value={product.id}>{ product.name }</option>
                  }
                  return null;
                })}
              </div>
              <div className="col">
                <input className="form-control" type="number" name="quantity" min="1" step="1"
                       value={updatedQuantities[detail.id]?.quantity || detail.quantity}
                       onChange={(e) => handleQuantityChange(detail.id, e)}
                       placeholder="Количество" max="1000" required />
              </div>
              <div className="col">
                <input className="form-control" type="number" name="price" min="1" step="0.1"
                       max="50000" placeholder="Цена" defaultValue={detail.price} required />
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <a className="btn btn-danger" onClick={() => detailDelete(detail.id)}>Удалить</a>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Details;