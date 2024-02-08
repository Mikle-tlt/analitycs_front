import React, {useEffect, useState} from 'react';
import {usePointsStore} from "../../services/points/points-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {useRegionsStore} from "../../services/regions/regions";

const Points = () => {
  const { points, addPoint, deletePoint, getPoints, updatePoint } = usePointsStore();
  const { user } = useUserStore();
  const { regions, getRegions } = useRegionsStore();
  const [updatedPoints, setUpdatedPoints] = useState([]);
  const navigate = useNavigate();

  const pointAdd = async (e) => {
    e.preventDefault();
    const point = {
      address: e.target.address.value,
      regionId: e.target.regionId.value
    };
    await addPoint(user.id, point)
      .then(() => {
        toast.success("Пункт выдачи успешно добавлен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const pointEdit = async (e, pointId, regionId) => {
    e.preventDefault();
    const point = {
      id: pointId,
      address: e.target.address.value,
      regionId: updatedPoints[pointId]?.regionId || regionId
    };

    await updatePoint(point)
      .then(() => {
        toast.success("Пункт выдачи успешно изменен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const pointDelete= async (pointId) => {
    await deletePoint(pointId)
      .then(() => {
        toast.success("Пункт выдачи успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const handleRegionChange = (pointId, event) => {
    const newPoints = [...updatedPoints];
    newPoints[pointId] = { ...newPoints[pointId], regionId: event.target.value };
    setUpdatedPoints(newPoints);
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getPoints(user.id);
    getRegions(user.id);
  }, [user.id, getPoints, getRegions])

  useEffect(() => {
    setUpdatedPoints([]);
  }, [points]);

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Пункты выдачи</span></h1>
          </div>
        </div>
        <form onSubmit={pointAdd}>
          <div className="row">
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
        {!points && <p>Пункты выдачи не найдены!</p>}
        {points && points.map((point) => (
          <form key={point.id}
                className="mb-2"
                onSubmit={(e) => pointEdit(e, point.id, point.regionId )}>
            <div className="row">
              <div className="col">
                <input className="form-control" type="text" name="address" placeholder="Адрес" required
                       defaultValue={point.address} />
              </div>
              <div className="col-auto">
                <select className="form-control"
                        name="regionId"
                        required
                        onChange={(e) => handleRegionChange(point.id, e)}
                        value={updatedPoints[point.id]?.regionId || point.regionId}>
                  {regions?.map((region) => (
                    <option key={region.id} value={region.id}>{ region.name }</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <a className="btn btn-danger" onClick={() => pointDelete(point.id)}>Удалить</a>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Points;