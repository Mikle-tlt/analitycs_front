import React, {useEffect} from 'react';
import {useClientsStore} from "../../services/clients/clients-service";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";
import {useUserStore} from "../../services/user/user-service";
import {DropdownButton, Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import FileUpload from "./file-upload/file-upload";

const Clients = () => {
  const { clients, addClient, updateClient, deleteClient, getClients, setSelectedClient } = useClientsStore();
  const { user } = useUserStore();
  const navigator = useNavigate();

  const clientAdd = async (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      contact: e.target.contact.value
    }
    await addClient(userData, user.id)
      .then(() => {
        toast.success("Клиент успешно добавлен!", options)
        e.target.reset();
      })
      .catch((e) => toast.error(e, options))
  }

  const clientUpdate = async (e, clientId) => {
    e.preventDefault();
    const userData = {
      id: clientId,
      name: e.target.name.value,
      contact: e.target.contact.value
    }
    await updateClient(userData)
      .then(() => {
        toast.success("Данные клиента успешно изменены!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  const clientDelete = async (clientId) => {
    await deleteClient(clientId)
      .then(() => {
        toast.success("Клиент успешно удален!", options)
      })
      .catch((e) => toast.error(e, options))
  }
  const onClientBuys = (client) => {
    setSelectedClient(client);
    const clientId = client.id;
    navigator(`/clients/${clientId}/buys`)
  }

  useEffect(() => {
    getClients(user.id);
  }, [user])

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Клиенты</span></h1>
          </div>
        <FileUpload getClients={getClients}/>
        </div>
        <form onSubmit={clientAdd}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="name" placeholder="Имя" required />
            </div>
            <div className="col">
              <input className="form-control" type="text" name="contact" placeholder="Контактные данные" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Добавить</button>
            </div>
          </div>
        </form>
        <hr />
        {!clients && <p>Клинеты не найдены</p>}
        {clients && clients.map((client) => (
          <form className="mb-2" onSubmit={(e) => clientUpdate(e, client.id)} key={client.id}>
            <div className="row">
              <div className="col">
                <input className="form-control"
                       type="text"
                       name="name"
                       placeholder="Имя"
                       required
                       defaultValue={client.name} />
              </div>
              <div className="col">
                <input className="form-control"
                       defaultValue={client.contact}
                       type="text"
                       name="contact"
                       placeholder="Контактные данные"
                       required />
              </div>
              <div className="col-auto">
                <button className="btn btn-info" type="submit">Обновить</button>
              </div>
              <div className="col-auto">
                <DropdownButton id="dropdown-basic-button" title="Действия">
                  <Dropdown.Item onClick={() => onClientBuys(client)}>Покупки</Dropdown.Item>
                  <Dropdown.Item onClick={() => clientDelete(client.id)}>Удалить</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
};

export default Clients;