import React, {useEffect, useRef, useState} from 'react';
import {useOnlineGeneralStore} from "../../../services/online-analytics/general-analytics/online-general-analytics";
import {toast} from "react-toastify";
import {options} from "../../elements/alert/alert-settings";
import {useUserStore} from "../../../services/user/user-service";

const OnlineGeneralAnalytics = () => {
  const { defaultOnlineGeneralList, onlineGeneralList,
    getFilteredOnlineGeneral, getOnlineGeneral, setOnlineGeneral } = useOnlineGeneralStore();
  const { user } = useUserStore();
  const [sumInfo, setSumInfo] = useState({
    revenue: 0,
    costPrice: 0,
    different: 0,
    quantity: 0
  });

  const culcSumInfo = () => {
    setSumInfo({
      revenue: onlineGeneralList.reduce((sum, current) => sum + current.revenue, 0),
      costPrice: onlineGeneralList.reduce((sum, current) => sum + current.costPrice, 0),
      different: onlineGeneralList.reduce((sum, current) => sum + current.different, 0),
      quantity: onlineGeneralList.reduce((sum, current) => sum + current.quantity, 0),
    })
  }

  useEffect(() => {
    getOnlineGeneral(user.id);
  }, []);

  useEffect(() => {
    if(onlineGeneralList) {
      culcSumInfo();
    }
  }, [onlineGeneralList])

  const getFilteredList = async (e) => {
    e.preventDefault();
    const withDate = e.target.withDate.value;
    const byDate = e.target.byDate.value;
    const userId = user.id;
    await getFilteredOnlineGeneral(userId, withDate, byDate)
      .catch((e) => {
        toast.error(e, options);
        e.target.reset();
      })
  }

  const resetDate = () => {
    document.getElementsByName('withDate')[0].value = '';
    document.getElementsByName('byDate')[0].value = '';
    setOnlineGeneral(defaultOnlineGeneralList);
  };

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Общая сводка по онлайн продажам</span></h1>
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
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Название</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Количество</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Выручка</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Себестоимость</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Прибыль</p></div>
        </div>

        {(!onlineGeneralList || onlineGeneralList.length === 0) && <p>Данные для сводки отсутствуют!</p>}
        {onlineGeneralList && onlineGeneralList.map((item) => (
          <div className="row" key={ item.productId }>
            <div className="col text-center"><p>{ item.productName } ({item.categoryName})</p></div>
            <div className="col text-end"><p>{ item.quantity }</p></div>
            <div className="col text-end"><p>{ item.revenue }</p></div>
            <div className="col text-end"><p>{ item.costPrice }</p></div>
            <div className="col text-end"><p>{ item.different }</p></div>
          </div>
        ))}
        <div className="row">
          <div className="col text-center"><p style={{ fontWeight: '800' }}>Итого</p></div>
          <div className="col text-end"><p style={{ fontWeight: '800' }}>{ sumInfo.quantity }</p></div>
          <div className="col text-end">
            <p style={{ fontWeight: '800' }}>{ sumInfo.revenue }</p>
          </div>
          <div className="col text-end">
            <p style={{ fontWeight: '800' }}>{ sumInfo.costPrice }</p>
          </div>
          <div className="col text-end">
            <p style={{ fontWeight: '800' }}>{ sumInfo.different }</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineGeneralAnalytics;