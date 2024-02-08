import React, {useState} from 'react';
import {
  useOnlineProfitabilityStore
} from "../../../services/online-analytics/profitability-analytics/online-profitability-analytics";
import {toast} from "react-toastify";
import {options} from "../../elements/alert/alert-settings";
import {useUserStore} from "../../../services/user/user-service";

const OnlineProfitabilityAnalytics = () => {
  const { profitabilityData, getOnlineProfitabilityData, labelText,
    setDefaultProfitability } = useOnlineProfitabilityStore();
  const { user } = useUserStore();

  const [dateWithF, setDateWithF] = useState('');
  const [dateByF, setDateByF] = useState('');
  const [dateWithS, setDateWithS] = useState('');
  const [dateByS, setDateByS] = useState('');

  const dataReset = () => {
    setDateWithF('');
    setDateByF('');
    setDateWithS('');
    setDateByS('');
    setDefaultProfitability();
  }

  const getProfitabilityData = async (e) => {
    e.preventDefault();
    const userId = user.id;
    await getOnlineProfitabilityData(userId, dateWithF, dateByF, dateWithS, dateByS)
      .catch((e) => {
        toast.error(e, options);
        dataReset()
      })
  }

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Анализ рентабельности товаров по онлайн продажам</span></h1>
          </div>
        </div>
        <form onSubmit={getProfitabilityData}>
          <div className="row">
            <div className="col-4 mb-2">
              <p className="lead">Первый период</p>
            </div>
            <div className="col-4 mb-2">
              <input className="form-control" type="date" name="date_with_f"
                     value={dateWithF} onChange={(e) => setDateWithF(e.target.value)} required />
            </div>
            <div className="col-4 mb-2">
              <input className="form-control" type="date" name="date_by_f"
                     value={dateByF} onChange={(e) => setDateByF(e.target.value)} required />
            </div>
            <div className="col-4 mb-2">
              <p className="lead">Второй период</p>
            </div>
            <div className="col-4 mb-2">
              <input className="form-control" type="date" name="date_with_s"
                     value={dateWithS} onChange={(e) => setDateWithS(e.target.value)} required />
            </div>
            <div className="col-4 mb-2">
              <input className="form-control" type="date" name="date_by_s"
                     value={dateByS} onChange={(e) => setDateByS(e.target.value)} required />
            </div>
            <div className="col-6 mb-2">
              <button className="btn btn-primary w-100" type="submit">Сгенерировать</button>
            </div>
            <div className="col-6 mb-2">
              <a className="btn btn-info w-100" onClick={dataReset}>Сбросить</a>
            </div>
          </div>
        </form>
        <hr />
        <div className="row">
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Название</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Первый период</p></div>
          <div className="col text-center"><p className="lead" style={{ fontWeight: '800' }}>Второй период</p></div>
        </div>
        {(!profitabilityData || profitabilityData.length === 0) && <p>Данные для аналза отсутствуют!</p>}
        {profitabilityData && profitabilityData.map((item) => (
          <div className="row" key={ item.productId }>
            <div className="col text-center"><p>{ item.productName } ({item.categoryName})</p></div>
            <div className="col text-end"><p>{ item.firstPeriod }</p></div>
            <div className="col text-end"><p>~ { item.secondPeriod } %</p></div>
          </div>
        ))}
        <div>{ labelText }</div>
      </div>
    </section>
  );
};

export default OnlineProfitabilityAnalytics;