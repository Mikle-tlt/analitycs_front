import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {options} from "../../elements/alert/alert-settings";
import {useUserStore} from "../../../services/user/user-service";
import {useOnlineABCStore} from "../../../services/online-analytics/abc-analytics/online-abc-analytics";

const OnlineABCAnalytics = () => {
  const { defaultOnlineABCList, onlineABCList, getFilteredOnlineABC, getOnlineABC, setOnlineABC, labelText } = useOnlineABCStore();
  const { user } = useUserStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const culcSumInfo = () => {
    setSumInfo({
      revenue: onlineABCList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: onlineABCList.reduce((sum, current) => sum + current.costPrice, 0),
      different: onlineABCList.reduce((sum, current) => sum + current.different, 0),
      quantity: onlineABCList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  useEffect(() => {
    getOnlineABC(user.id);
  }, [user.id, getOnlineABC]);

  useEffect(() => {
    if(onlineABCList) {
      culcSumInfo();
    }
  }, [onlineABCList])

  const getFilteredList = async (e) => {
    e.preventDefault();
    const withDate = e.target.withDate.value;
    const byDate = e.target.byDate.value;
    const userId = user.id;
    await getFilteredOnlineABC(userId, withDate, byDate)
      .catch((e) => {
        toast.error(e, options);
        e.target.reset();
      })
  }

  const resetDate = () => {
    document.getElementsByName('withDate')[0].value = '';
    document.getElementsByName('byDate')[0].value = '';
    setOnlineABC(defaultOnlineABCList);
  };

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">ABC-анализ онлайн продаж</span></h1>
          </div>
        </div>
        <form onSubmit={getFilteredList}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="date" name="withDate" required />
            </div>
            <div className="col">
              <input className="form-control" type="date" name="byDate" required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Сгенерировать</button>
            </div>
            <div className="col-auto">
              <button className="btn btn-info" onClick={resetDate}>Сбросить</button>
            </div>
          </div>
        </form>
        <hr/>
        <div className="row">
          <div className="col text-center">
            <p className="lead">Количество проданных товаров:
              <span>{ sumInfo.quantity }</span>
            </p>
          </div>
          <div className="col text-center">
            <p className="lead">Выручка:
              <span>{ sumInfo.revenue }</span>
            </p>
          </div>
          <div className="col text-center">
            <p className="lead">Себестоимость:
              <span>{ sumInfo.costPrice }</span>
            </p>
          </div>
          <div className="col text-center">
            <p className="lead">Прибыль:
              <span>{ sumInfo.different }</span>
            </p>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Название</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Количество</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Выручка</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Себестоимость</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Прибыль</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Доля прибыли</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Группа</p></div>
        </div>

        {(!onlineABCList || onlineABCList.length === 0) && <p>Данные для ABC аналза отсутствуют!</p>}
        {onlineABCList && onlineABCList.map((item) => (
          <div className="row" key={ item.productId }>
            <div className="col text-center"><p>{ item.productName } ({item.categoryName})</p></div>
            <div className="col text-end"><p>{ item.quantity }</p></div>
            <div className="col text-end"><p>{ item.revenue }</p></div>
            <div className="col text-end"><p>{ item.costPrice }</p></div>
            <div className="col text-end"><p>{ item.different }</p></div>
            <div className="col text-end"><p>~ { item.profitShare } %</p></div>
            <div className="col text-end"><p>{ item.group }</p></div>
          </div>
        ))}
      </div>
      <div>{ labelText }</div>
    </section>
  );
};

export default OnlineABCAnalytics;