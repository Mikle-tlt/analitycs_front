import React from 'react';
import logo from '../../static/images/logo.png'
import {useUserStore} from "../../services/user/user-service";
import {useNavigate} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";

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
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Онлайн"
                  menuVariant="dark"
                  style={{ padding: '8px 16px' }}
                >
                  <NavDropdown.Item onClick={() => navigate('analytics/online/general')}>Общая сводка</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('analytics/online/abc')}>ABC-анализ</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('analytics/online/xyz')}>XYZ-анализ</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('analytics/online/profitability')}>
                    Анализ рентабельности товаров
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('analytics/online/growth')}>Анализ темпов продаж</NavDropdown.Item>
                  <NavDropdown.Item href="/points">Анализ продаж по категориям</NavDropdown.Item>
                  <NavDropdown.Item href="/points">Региональный анализ продаж</NavDropdown.Item>
                  <NavDropdown.Item href="/points">Анализ клиентской базы</NavDropdown.Item>
                </NavDropdown>
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
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Торговые точки"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item href="/points/offline">Офлайн точки</NavDropdown.Item>
                    <NavDropdown.Item href="/points">Пункты выдачи</NavDropdown.Item>
                  </NavDropdown>
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