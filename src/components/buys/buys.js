import React, {useEffect} from 'react';
import {useClientsStore} from "../../services/clients/clients-service";
import {useParams} from "react-router-dom";
import {Dropdown, DropdownButton} from "react-bootstrap";

const Buys = () => {
  const { selectedClient, getSelectedClient } = useClientsStore();
  const { clientId } = useParams();

  useEffect(() => {
    getSelectedClient(clientId)
  }, [clientId])

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
          <form>
            <div className="row">
              <div className="col">
                <input className="form-control" type="date" name="date" required />
              </div>
              <div className="col-auto">
                <select className="form-select" name="pointId" required>
                  <option></option>
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">Добавить</button>
              </div>
            </div>
          </form>

          <hr />
            <form>
              <div className="row">
                <div className="col">
                  <input className="form-control" type="date" name="date" required />
                </div>
                <div className="col">
                  <input className="form-control" type="text" name="point" readOnly placeholder="Пункт выдачи" required/>
                </div>
                <div className="col-auto">
                  <button className="btn btn-info" type="submit">Обновить</button>
                </div>
                <div className="col-auto">
                  <DropdownButton id="dropdown-basic-button" title="Действия">
                    <Dropdown.Item>Детали</Dropdown.Item>
                    <Dropdown.Item>Удалить</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </form>
      </div>
    </section>
  );
};

export default Buys;