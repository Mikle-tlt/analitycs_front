import {Chart} from "react-google-charts";
import {useUserStore} from "../../../services/user/user-service";
import {useProductsStore} from "../../../services/products/products-service";
import {useOnlineGrowthStore} from "../../../services/online-analytics/growth-analytics/online-growth-analytics";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {options} from "../../elements/alert/alert-settings";
import {toast} from "react-toastify";
import {
  calculateApproximation
} from "../../../services/online-analytics/growth-analytics/chart-generate-data/chart-generate-data";

const OnlineGrowthAnalytics = () => {
  const { revenues, days, labelText, getOnlineGrowthData, setDefaultData } = useOnlineGrowthStore();
  const { products, getProducts } = useProductsStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [approximations, setApproximations] = useState([]);
  const [withDate, setWithDate] = useState('');
  const [byDate, setByDate] = useState('');

  useEffect(() => {
    if (!user.id) {
      navigate('/');
      return;
    }
    getProducts(user.id);
  }, [user.id, getProducts, navigate])

  useEffect(() => {
    if (revenues && days && revenues.length === days.length) {
      const approximations = revenues.map((_, index) => calculateApproximation(index, revenues));
      setApproximations(approximations);
    }
  }, [revenues, days]);

  const getDateGorGraph = async (e) => {
    e.preventDefault();
    const productId = e.target.productId.value;
    const userId = user.id;
    await getOnlineGrowthData(userId, productId, withDate, byDate)
      .catch((e) => {
        toast.error(e, options);
        e.target.reset();
      })
  }

  const resetData = (e) => {
    setDefaultData();
    setWithDate('');
    setByDate('');
  }

  return (
    <section className="py-5 mt-5">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col text-center mx-auto">
            <h1 className="fw-bold"><span className="pb-2">Анализ темпов онлайн продаж</span></h1>
          </div>
        </div>
        <form onSubmit={getDateGorGraph}>
          <div className="row">
            <div className="col">
              <select name="productId" className="form-select">
                {products?.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <input className="form-control" type="date" name="withDate"
                     value={withDate}  onChange={(e) => setWithDate(e.target.value)}  required />
            </div>
            <div className="col">
              <input className="form-control" type="date" name="byDate"
                     value={byDate} onChange={(e) => setByDate(e.target.value)} required />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">Сгенерировать</button>
            </div>
            <div className="col-auto">
              <button className="btn btn-info" onClick={resetData}>Сбросить</button>
            </div>
          </div>
        </form>
        <hr />
        {(!revenues || revenues.length !== 0) && (!days || days.length !== 0) && (
          <div className="row">
            <div className="col">
              <Chart
                width={'100%'}
                height={'500px'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Дата', 'Темп продаж', 'Аппроксимация'],
                  ...days.map((day, index) => [day, revenues[index], approximations[index]])
                ]}
                options={{
                  title: 'График темпов онлайн продаж',
                  hAxis: { title: 'Дата' },
                  vAxis: { title: 'Темп продаж' },
                  bar: { groupWidth: "80%" },
                  seriesType: 'line',
                  series: { 1: { type: 'line' } }
                }}
                rootProps={{ 'data-testid': '1' }}
              />
              {labelText}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnlineGrowthAnalytics;
