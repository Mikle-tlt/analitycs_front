import React from 'react';
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {options} from "../elements/alert/alert-settings";

const Login = () => {

  const { login } = useUserStore();
  const navigate = useNavigate();

  const useLogin = async (e) => {
    e.preventDefault()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    await login(userData)
      .then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role === "ADMIN") {
          navigate('/profiles')
        } else {
          navigate('/clients')
        }
      })
      .catch((e) => toast.error(e, options))
  }

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Вход</span></h1>
          </div>
        </div>
        <form onSubmit={useLogin}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="text" name="username" placeholder="Логин" required />
            </div>
            <div className="col">
              <input className="form-control" type="password" name="password" placeholder="Пароль" required />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 mt-3" type="submit">Войти</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;