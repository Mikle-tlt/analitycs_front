import React, {useEffect} from 'react';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate, useParams} from "react-router-dom";
import {useOfflineBuysStore} from "../../services/offline-buys/offline-buys-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useOfflinePointsStore} from "../../services/offline-points/offline-points-service";

const OfflineBuys = () => {
  const { offlineBuys, addOfflineBuy, deleteOfflineBuy, getOfflineBuys, updateOfflineBuy } = useOfflineBuysStore();
  const { getOfflinePoint, offlinePoint } = useOfflinePointsStore();
  const { offlinePointId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const offlineBuyAdd = async (e) => {
    e.preventDefault();
    const  date = e.target.date.value;
    await addOfflineBuy(date, offlinePointId)
      .then(() => {
        toast.success("Продажа успешно добавлена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlineBuyEdit = async (e, offlineBuyId) => {
    e.preventDefault();
    const  date = e.target.date.value;
    await updateOfflineBuy(date, offlineBuyId)
      .then(() => {
        toast.success("Дата продажи успешно изменена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlineBuyDelete = async(offlineBuyId) => {
    await deleteOfflineBuy(offlineBuyId)
      .then(() => {
        toast.success("Продажа успешно удалена!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const navigateToDetails = (offlineBuyId) => {
    navigate(`/points/offline/${offlinePointId}/buys/${offlineBuyId}/details`);
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getOfflineBuys(offlinePointId);
    getOfflinePoint(offlinePointId);
  }, [offlinePointId, getOfflinePoint, getOfflineBuys])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Продажи</span></h1>
          </div>
        </div>
        {offlinePoint && (
          <>
            <div className="row text-center">
              <div className="col">
                <p className="lead">{ offlinePoint.name }</p>
              </div>
              <div className="col">
                <p className="lead">{ offlinePoint.address }</p>
              </div>
              <div className="col">
                <p className="lead">{ offlinePoint.regionName }</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="lead">Выручка: <span>{ offlinePoint.revenue }</span></p>
              </div>
              <div className="col">
                <p className="lead">Себестоимость: <span>{  offlinePoint.costPrice}</span></p>
              </div>
              <div className="col">
                <p className="lead">Прибыль: <span>{ offlinePoint.different }</span></p>
              </div>
            </div>
          </>
        )}
        <hr/>
        <form onSubmit={offlineBuyAdd}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="date" name="date" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr/>
        {(!offlineBuys || offlineBuys.length === 0) && <p>Для данной оффлайн точки продажи не найдены</p>}
        {offlineBuys && offlineBuys.map((offlineBuy) => (
          <form className="mb-2" key={offlineBuy.id} onSubmit={(e) => offlineBuyEdit(e, offlineBuy.id)}>
            <div className="row">
              <div className="col">
                <input className="form-control" type="date" name="date" required defaultValue={offlineBuy.date} />
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <DropdownButton id="dropdown-basic-button" title="Действия">
                  <Dropdown.Item
                    onClick={() => navigateToDetails(offlineBuy.id)}>
                    Детали
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => offlineBuyDelete(offlineBuy.id)}>Удалить</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default OfflineBuys;