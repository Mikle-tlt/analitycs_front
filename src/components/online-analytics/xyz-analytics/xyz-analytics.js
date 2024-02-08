import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {options} from "../../elements/alert/alert-settings";
import {useUserStore} from "../../../services/user/user-service";
import {useOnlineABCStore} from "../../../services/online-analytics/abc-analytics/online-abc-analytics";
import {useOnlineXYZStore} from "../../../services/online-analytics/xyz-analytics/online-xyz-analytics";

const OnlineXYZAnalytics = () => {
  const { onlineXYZList, getOnlineXYZ, labelText } = useOnlineXYZStore();
  const { user } = useUserStore();
  const today = new Date().toISOString().substr(0, 10);
  const [withDate, setWithDate] = useState(today);
  const [byDate, setByDate] = useState(today);

  useEffect(() => {
    getOnlineXYZ(user.id, withDate, byDate);
  }, [user.id, getOnlineXYZ]);

  const getFilteredList = async (e) => {
    e.preventDefault();
    const userId = user.id;
    await getOnlineXYZ(userId, withDate, byDate)
      .catch((e) => {
        toast.error(e, options);
        e.target.reset();
      })
  }

  const resetDate = () => {
    setWithDate(today);
    setByDate(today);
    getOnlineXYZ(user.id, today, today);
  };

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">XYZ-анализ онлайн продаж</span></h1>
          </div>
        </div>
        <form onSubmit={getFilteredList}>
          <div className="row">
            <div className="col">
              <input className="form-control" type="date" name="withDate" value={withDate}
                     onChange={(e) => setWithDate(e.target.value)} required/>
            </div>
            <div className="col">
              <input className="form-control" type="date" name="byDate" value={byDate}
                     onChange={(e) => setByDate(e.target.value)} required/>
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
        <hr/>
        <div className="row">
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Название</p></div>
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Выручка</p></div>
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Средняя выручка</p></div>
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Cредне-взвешенное
            отклонение</p></div>
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Cредне-квадратическое
            отклонение</p></div>
          <div className="col-2 text-center"><p className="lead" style={{ fontWeight: '800' }}>Группа</p></div>
        </div>

        {(!onlineXYZList || onlineXYZList.length === 0) && <p>Данные для ABC аналза отсутствуют!</p>}
        {onlineXYZList && onlineXYZList.map((item) => (
          <div className="row" key={ item.productId }>
            <div className="col text-center"><p>{ item.productName } ({item.categoryName})</p></div>
            <div className="col text-end"><p>{ item.revenue }</p></div>
            <div className="col text-end"><p>{ item.revenueAverage }</p></div>
            <div className="col text-end"><p>{ item.standardDeviation }</p></div>
            <div className="col text-end"><p>{ item.rms }</p></div>
            <div className="col text-end"><p>{ item.group }</p></div>
          </div>
        ))}
      </div>
      <div>{ labelText }</div>
    </section>
  );
};

export default OnlineXYZAnalytics;