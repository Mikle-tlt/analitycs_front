import React from 'react';
import logo from '../../static/images/logo.png'
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const { user, logout } = useUserStore();

  const navigate = useNavigate();
  const manager = user.role === 'MANAGER';
  const admin = user.role === 'ADMIN';

  const userLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-shrink py-3 navbar-light" id="mainNav">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/products">
          <img src={logo} alt="Логотип" style={{ width: '60px', height: 'auto', backgroundColor: '#000' }} />
        </a>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto align-items-center text-center">
            {
              manager &&
              <li className="nav-item">
                <div className="nav-item dropdown" style={{ padding: '8px 16px' }}>
                  <a className="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown"
                     href="#">Онлайн</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/generalOnline">Общая сводка</a>
                    <a className="dropdown-item" href="/abc">ABC-анализ</a>
                    <a className="dropdown-item" href="/xyz">XYZ-анализ</a>
                    <a className="dropdown-item" href="/profitability">Анализ рентабельности товаров</a>
                    <a className="dropdown-item" href="/growth">Анализ темпов продаж</a>
                    <a className="dropdown-item" href="/sold">Анализ продаж по категориям</a>
                    <a className="dropdown-item" href="/region">Региональный анализ продаж</a>
                    <a className="dropdown-item" href="/customer">Анализ клиентской базы</a>
                  </div>
                </div>
              </li>
            }
            {
              manager &&
              <li className="nav-item">
                <div className="nav-item dropdown" style={{ padding: '8px 16px' }}>
                  <a className="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown"
                     href="#">Офлайн</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/offline/general">Общая сводка</a>
                    <a className="dropdown-item" href="/offline/abc">ABC-анализ</a>
                    <a className="dropdown-item" href="/offline/xyz">XYZ-анализ</a>
                    <a className="dropdown-item" href="/offline/profitability">Анализ рентабельности товаров</a>
                    <a className="dropdown-item" href="/offline/growth">Анализ темпов продаж</a>
                    <a className="dropdown-item" href="/offline/sold">Анализ продаж по категориям</a>
                    <a className="dropdown-item" href="/offline/region">Региональный анализ продаж</a>
                    <a className="dropdown-item" href="/off">Анализ ассортимента офлайн магазинов</a>
                  </div>
                </div>
              </li>
            }
            {
              manager &&
              <li className="nav-item">
                <div className="nav-item dropdown" style={{ padding: '8px 16px' }}>
                  <a className="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown"
                     href="#">Общие</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/all/general">Общая сводка</a>
                    <a className="dropdown-item" href="/all/abc">ABC-анализ</a>
                    <a className="dropdown-item" href="/all/xyz">XYZ-анализ</a>
                    <a className="dropdown-item" href="/all/profitability">Анализ рентабельности товаров</a>
                    <a className="dropdown-item" href="/all/growth">Анализ темпов продаж</a>
                    <a className="dropdown-item" href="/all/sold">Анализ продаж по категориям</a>
                    <a className="dropdown-item" href="/all/region">Региональный анализ продаж</a>
                  </div>
                </div>
              </li>
            }
            {
              manager &&
              <>
                <li  className="nav-item">
                  <a className="nav-link" href="/clients">Клиенты</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/categories">Категории</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/regions">Регионы</a>
                </li>
                <li  className="nav-item">
                  <a className="nav-link" href="/products">Товары</a>
                </li>
                <li  className="nav-item">
                  <div className="nav-item dropdown" style={{ padding: '8px 16px' }}>
                    <a className="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" href="/">
                      Торговые точки
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="/offlines">Офлайн точки</a>
                      <a className="dropdown-item" href="/points">Пункты выдачи</a>
                    </div>
                  </div>
                </li>
              </>
            }
            {
              manager &&
              <li className="nav-item">
                <a className="nav-link" href="/report">Отчет</a>
              </li>
            }
            {
              admin &&
              <li className="nav-item">
                <a className="nav-link" href="/profiles">Профили</a>
              </li>
            }
          </ul>
          {
            admin &&
            <button className="btn btn-primary shadow" role="button" onClick={() => navigate("/registration")}>Регистрация клиента</button>
          }
          <button className="btn btn-primary shadow" role="button" onClick={userLogout}>Выход</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;