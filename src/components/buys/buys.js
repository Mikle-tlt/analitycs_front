import React, {useEffect, useState} from 'react';
import {useClientsStore} from "../../services/clients/clients-service";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {usePointsStore} from "../../services/points/points-service";
import {useUserStore} from "../../services/user/user-service";
import {useBuysStore} from "../../services/buys/buys-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Buys = () => {
  const { getBuys, buys, addBuy, deleteBuy, updateBuy } = useBuysStore();
  const [updatedBuys, setUpdatedBuys] = useState([]);
  const { selectedClient, getSelectedClient } = useClientsStore();
  const { points, getPoints } = usePointsStore();
  const { clientId } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const buyAdd = async (e) => {
    e.preventDefault();
    const buy = {
      date: e.target.date.value,
      pointId: e.target.pointId.value
    };
    await addBuy(clientId, buy)
      .then(() => {
        toast.success("Покупка успешно добавлена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const buyEdit = async (e, buyId, pointId) => {
    e.preventDefault();
    const buy = {
      id: buyId,
      date: e.target.date.value,
      pointId: updatedBuys[buyId]?.pointId || pointId
    };
    await updateBuy(buy)
      .then(() => {
        toast.success("Покупка успешно изменена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const buyDelete = async(buyId) => {
    await deleteBuy(buyId)
      .then(() => {
        toast.success("Покупка успешно удалена!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const handlePointChange = (buyId, event) => {
    const newBuys = [...updatedBuys];
    newBuys[buyId] = { ...newBuys[buyId], pointId: event.target.value };
    setUpdatedBuys(newBuys);
  };

  const navigateToDetails = (buyId) => {
    navigate(`/clients/${clientId}/buys/${buyId}/details`)
  }

  useEffect(() => {
    getSelectedClient(clientId)
  }, [clientId])

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getBuys(clientId);
    getPoints(user.id);
  }, [getBuys, getPoints, clientId, user.id])

  useEffect(() => {
    setUpdatedBuys([]);
  }, [buys])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Покупки</span></h1>
          </div>
        </div>
        <a href="/clients" className="btn btn-primary mb-3 w-100">Назад</a>
        <div className="row">
          <div className="col text-center">
            <p className="lead">{selectedClient.name}</p>
          </div>
          <div className="col text-center">
            <p className="lead">{selectedClient.contact}</p>
          </div>
        </div>
        <hr />
        <form onSubmit={buyAdd}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="date" name="date" required />
            </div>
            <div className="col">
              <select className="form-select" name="pointId" required>
                {points?.map((point) => (
                  <option key={point.id} value={point.id}>{ point.address }</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {(!buys || buys.length === 0) && <p>Для данного клиента покупки не найдены</p>}
        {buys && buys.map((buy) => (
          <form className="mb-2" key={buy.id}
                onSubmit={(e) => buyEdit(e, buy.id, buy.pointId)}>
            <div className="row">
              <div className="col">
                <input className="form-control" type="date" name="date" defaultValue={buy.date} required />
              </div>
              <div className="col">
                <select className="form-select"
                        name="pointId"
                        value={updatedBuys[buy.id]?.pointId || buy.pointId}
                        onChange={(e) => handlePointChange(buy.id, e)}
                        required>
                  {points?.map((point) => (
                    <option key={point.id} value={point.id}>{ point.address }</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <DropdownButton id="dropdown-basic-button" title="Действия">
                  <Dropdown.Item onClick={() => navigateToDetails(buy.id)}>Детали</Dropdown.Item>
                  <Dropdown.Item onClick={() => buyDelete(buy.id)}>Удалить</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Buys;