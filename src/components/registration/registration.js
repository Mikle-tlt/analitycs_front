import React from 'react';
import {useProfilesStore} from "../../services/profiles/profiles-service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Registration = () => {

  const { addProfile } = useProfilesStore();
  const navigate = useNavigate();

  const registUser = async (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    await addProfile(userData)
      .then(() => {
        navigate('/profiles');
        toast.success("Профиль успешно добавлен!", options)
      })
      .catch((e) => toast.error(e, options))
  }

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Регистрация клиента</span></h1>
          </div>
        </div>
        <form onSubmit={registUser}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="username" placeholder="Логин" required />
            </div>
            <div className="col">
              <input className="form-control" type="password" name="password" placeholder="Пароль" />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 mt-3" type="submit">Зарегистрировать клиента</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;