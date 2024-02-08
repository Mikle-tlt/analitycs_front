import React, {useEffect, useState} from 'react';
import {useRegionsStore} from "../../services/regions/regions";
import {useOfflinePointsStore} from "../../services/offline-points/offline-points-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {Dropdown, DropdownButton} from "react-bootstrap";

const OfflinePoints = () => {
  const { offlinePoints, getOfflinePoints, addOfflinePoint,
    updateOfflinePoint, deleteOfflinePoint } = useOfflinePointsStore();
  const { regions, getRegions } = useRegionsStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [updatedOfflinePoints, setUpdatedOfflinePoints] = useState([]);

  const offlinePointAdd = async (e) => {
    e.preventDefault();
    const offlinePoint = {
      name: e.target.name.value,
      address: e.target.address.value,
      regionId: e.target.regionId.value
    };
    await addOfflinePoint(user.id, offlinePoint)
      .then(() => {
        toast.success("Оффлайн точка успешно добавлена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlinePointEdit = async (e, offlinePointId, regionId) => {
    e.preventDefault();
    const offlinePoint = {
      id: offlinePointId,
      name: e.target.name.value,
      address: e.target.address.value,
      regionId: updatedOfflinePoints[offlinePointId]?.regionId || regionId
    };

    await updateOfflinePoint(offlinePoint)
      .then(() => {
        toast.success("Оффлайн точка  успешно изменена!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const offlinePointDelete = async(offlinePointId) => {
    await deleteOfflinePoint(offlinePointId)
      .then(() => {
        toast.success("Оффлайн точка успешно удалена!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const handleRegionChange = (offlinePointId, event) => {
    const newOfflinePoints = [...updatedOfflinePoints];
    newOfflinePoints[offlinePointId] = { ...newOfflinePoints[offlinePointId], regionId: event.target.value };
    setUpdatedOfflinePoints(newOfflinePoints);
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getOfflinePoints(user.id);
    getRegions(user.id);
  }, [user.id, getOfflinePoints, getRegions])

  useEffect(() => {
    setUpdatedOfflinePoints([]);
  }, [offlinePoints])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Офлайн точки</span></h1>
          </div>
          <form id="excelImportForm" action="/offlines/{offlineId}/buys/upload-excel" method="post"
                encType="multipart/form-data">
            <div className="row mb-3">
              <div className="col">
                <input type="file" name="excelFile" accept=".xlsx, .xls" className="form-control" required />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-success">Импор Excel</button>
              </div>
            </div>
          </form>
        </div>
        <form onSubmit={offlinePointAdd}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="name" placeholder="Название" required />
            </div>
            <div className="col">
              <input className="form-control" type="text" name="address" placeholder="Адрес" required />
            </div>
            <div className="col-auto">
              <select className="form-control" name="regionId" required>
                {regions?.map((region) => (
                  <option key={region.id} value={region.id}>{ region.name }</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {!offlinePoints && <p>Оффлайн точки не найдены</p>}
        {offlinePoints && offlinePoints.map((offlinePoint) => (
          <form key={offlinePoint.id} className="mb-2"
                onSubmit={(e) => offlinePointEdit(e, offlinePoint.id, offlinePoint.regionId)}>
            <div className="row">
              <div className="col">
                <input className="form-control"
                       type="text"
                       name="name"
                       placeholder="Название"
                       defaultValue={offlinePoint.name}
                       required />
              </div>
              <div className="col">
                <input className="form-control"
                       type="text"
                       name="address"
                       placeholder="Адрес"
                       defaultValue={offlinePoint.address}
                       required />
              </div>
              <div className="col-auto">
                <select className="form-control"
                        name="regionId"
                        value={updatedOfflinePoints[offlinePoint.id]?.regionId || offlinePoint.regionId}
                        onChange={(e) => handleRegionChange(offlinePoint.id, e)}
                        required>
                  {regions?.map((region) => (
                    <option key={region.id} value={region.id}>{ region.name }</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <DropdownButton id="dropdown-basic-button" title="Действия">
                  <Dropdown.Item onClick={() => navigate(`/points/offline/${offlinePoint.id}/buys`)}>Продажи</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/points/offline/${offlinePoint.id}/products`)}>Товары</Dropdown.Item>
                  <Dropdown.Item onClick={() => offlinePointDelete(offlinePoint.id)}>Удалить</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default OfflinePoints;