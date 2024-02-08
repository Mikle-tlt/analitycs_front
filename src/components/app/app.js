import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useUserStore} from "../../services/user/user-service";
import Login from "../login/login";
import Header from "../header/header";
import Profiles from "../profiles/profiles";
import Registration from "../registration/registration";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Clients from "../clients/clients";
import Buys from "../buys/buys";
import Categories from "../categories/categories";
import Regions from "../regions/regions";
import Products from "../products/products";
import Points from "../points/points";
import OfflinePoints from "../offline-points/offline-points";
import OfflinePointProducts from "../offline-point-product/offline-point-products";
import OfflineBuys from "../offline-buys/offline-buys";
import OfflineDetails from "../offline-details/offline-details";
import Details from "../details/details";
import OnlineGeneralAnalytics from "../online-analytics/general-analytics/general-analytics";
import OnlineABCAnalytics from "../online-analytics/abc-analytics/abc-analytics";
import OnlineXYZAnalytics from "../online-analytics/xyz-analytics/xyz-analytics";
import OnlineGrowthAnalytics from "../online-analytics/growth-analytics/growth-analytics";
import OnlineProfitabilityAnalytics from "../online-analytics/profitability-analytics/profitability-analytics";

function App() {
  const { user } = useUserStore();
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {
          user && <Header />
        }
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/registration' element={<Registration />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/regions' element={<Regions />} />
          <Route path='/products' element={<Products />} />
          <Route path='/points' element={<Points />} />
          <Route path='/points/offline' element={<OfflinePoints />} />
          <Route path='/points/offline/:offlinePointId/products' element={<OfflinePointProducts />} />
          <Route path='/points/offline/:offlinePointId/buys' element={<OfflineBuys />} />
          <Route path='/points/offline/:offlinePointId/buys/:offlineBuyId/details' element={<OfflineDetails />} />
          <Route path='/clients/:clientId/buys' element={<Buys />} />
          <Route path='/clients/:clientId/buys/:buyId/details' element={<Details />} />
          <Route path='analytics/online/general' element={<OnlineGeneralAnalytics />} />
          <Route path='analytics/online/abc' element={<OnlineABCAnalytics />} />
          <Route path='analytics/online/xyz' element={<OnlineXYZAnalytics />} />
          <Route path='analytics/online/growth' element={<OnlineGrowthAnalytics />} />
          <Route path='analytics/online/profitability' element={<OnlineProfitabilityAnalytics />} />

          <Route path='*' element={''} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
