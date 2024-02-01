import React, {useEffect} from 'react';
import {useRegionsStore} from "../../services/regions/regions";
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Regions = () => {
  const { regions, addRegion, deleteRegion, getRegions, updateRegion } = useRegionsStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const regionAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    await addRegion(name, user.id)
      .then(() => {
        toast.success("Регион успешно добавлен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }
  const regionEdit = async (e, regionId) => {
    e.preventDefault();
    const name = e.target.name.value;
    await updateRegion(name, regionId)
      .then(() => {
        toast.success("Регион успешно изменён!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }
  const regionDelete = async (regionId) => {
    await deleteRegion(regionId)
      .then(() => {
        toast.success("Регион успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  useEffect(() => {
    if (!user.id) {
      navigate('/')
    }
    getRegions(user.id)
  }, [])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Регионы</span></h1>
          </div>
        </div>

        <form onSubmit={regionAdd}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="name" placeholder="Имя" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {!regions && <p>Регионы не найдены</p>}
        {regions && regions.map((region) => (
          <form key={region.id} className="mb-2" onSubmit={(e) => regionEdit(e, region.id)}>
            <div className="row">
              <div className="col">
                <input className="form-control" type="text" required name="name" defaultValue={region.name} />
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <a className="btn btn-danger" onClick={() => regionDelete(region.id)}>Удалить</a>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Regions;