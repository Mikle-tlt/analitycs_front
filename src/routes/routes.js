import { Navigate, Route, Routes } from 'react-router-dom';
import { UnAuthenticatedRoute } from './check-routes/unauthenticated/unauthenticated';
import { AuthenticatedRoute } from './check-routes/authenticated/authenticated';
import { MainContent } from './check-routes/content/content-route';
import { ManagerRoute } from './check-routes/manager/manager-route';
import { AdminRoute } from './check-routes/admin/admin-route';
import { Details } from '../pages/details';
import { Clients } from '../pages/clients';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';
import { Categories } from '../pages/categories';
import { Regions } from '../pages/regions';
import { Products } from '../pages/products';
import { Points } from '../pages/points';
import { OfflinePoints } from '../pages/offline-points';
import { OfflinePointProducts } from '../pages/offline-point-product';
import { OfflineBuys } from '../pages/offline-buys';
import { OfflineDetails } from '../pages/offline-details';
import { Buys } from '../pages/buys';
import { Profiles } from '../pages/profiles';
import { OnlineGeneralAnalytics } from '../pages/online-analytics/general-analytics';
import { OnlineABCAnalytics } from '../pages/online-analytics/abc-analytics';
import { OnlineXYZAnalytics } from '../pages/online-analytics/xyz-analytics';
import { OnlineGrowthAnalytics } from '../pages/online-analytics/growth-analytics';
import { OnlineProfitabilityAnalytics } from '../pages/online-analytics/profitability-analytics';
import { route } from '../constants';
import { OnlineByCategoryAnalytics } from '../pages/online-analytics/by-category-analytics/by-category-analytics';
import { OnlineRegionAnalytics } from '../pages/online-analytics/region-analytics/region-analytics';
import { OnlineCustomersAnalytics } from '../pages/online-analytics/customers-analytics/customers-analytics';
import { OfflineGeneralAnalytics } from '../pages/offline-analytics/general-analytics';
import { OfflineABCAnalytics } from '../pages/offline-analytics/abc-analytics';
import { OfflineXYZAnalytics } from '../pages/offline-analytics/xyz-analytics';
import {
  OfflineProfitabilityAnalytics
} from '../pages/offline-analytics/profitability-analytics/profitability-analytics';
import { OfflineGrowthAnalytics } from '../pages/offline-analytics/growth-analytics/growth-analytics';
import { OfflineByCategoryAnalytics } from '../pages/offline-analytics/by-category-analytics/by-category-analytics';
import { OfflineRegionAnalytics } from '../pages/offline-analytics/region-analytics/region-analytics';
import { OfflineAssortmentAnalytics } from '../pages/offline-analytics/assortment-analytics/assortment-analytics';
import { TotalGeneralAnalytics } from '../pages/total-analytics/general-analytics/general-analytics';
import { TotalABCAnalytics } from '../pages/total-analytics/abc-analytics/abc-analytics';
import { TotalXYZAnalytics } from '../pages/total-analytics/xyz-analytics/xyz-analytics';
import { TotalProfitabilityAnalytics } from '../pages/total-analytics/profitability-analytics/profitability-analytics';
import { TotalGrowthAnalytics } from '../pages/total-analytics/growth-analytics/growth-analytics';
import { TotalByCategoryAnalytics } from '../pages/total-analytics/by-category-analytics/by-category-analytics';
import { TotalRegionAnalytics } from '../pages/total-analytics/region-analytics/region-analytics';
import { Report } from '../pages/report';

export const Routes_ = () => (
  <Routes>
    <Route path='/' element={<Navigate to={route.LOGIN} />} />

    <Route element={<UnAuthenticatedRoute />}>
      <Route path={route.LOGIN} element={<Login />} />
    </Route>

    <Route element={<AuthenticatedRoute />}>
      <Route element={<MainContent />}>

        <Route element={<ManagerRoute />}>
          <Route path={route.CLIENTS.MAIN} element={<Clients />} />
          <Route path={route.CATEGORIES} element={<Categories />} />
          <Route path={route.REGIONS} element={<Regions />} />
          <Route path={route.PRODUCTS} element={<Products />} />

          <Route path={route.POINTS.MAIN} element={<Points />} />
          <Route path={route.POINTS.OFFLINE} element={<OfflinePoints />} />
          <Route path={route.POINTS.OFFLINE_PRODUCTS} element={<OfflinePointProducts />} />
          <Route path={route.POINTS.OFFLINE_BUYS} element={<OfflineBuys />} />
          <Route path={route.POINTS.OFFLINE_BUYS_DETAILS} element={<OfflineDetails />} />

          <Route path={route.CLIENTS.BUYS} element={<Buys />} />
          <Route path={route.CLIENTS.BUYS_DETAILS} element={<Details />} />

          <Route path={route.ANALYTICS.GENERAL} element={<OnlineGeneralAnalytics />} />
          <Route path={route.ANALYTICS.ABC} element={<OnlineABCAnalytics />} />
          <Route path={route.ANALYTICS.XYZ} element={<OnlineXYZAnalytics />} />
          <Route path={route.ANALYTICS.GROWTH} element={<OnlineGrowthAnalytics />} />
          <Route path={route.ANALYTICS.PROFITABILITY} element={<OnlineProfitabilityAnalytics />} />
          <Route path={route.ANALYTICS.BY_CATEGORY} element={<OnlineByCategoryAnalytics />} />
          <Route path={route.ANALYTICS.REGIONS} element={<OnlineRegionAnalytics />} />
          <Route path={route.ANALYTICS.CLIENTS} element={<OnlineCustomersAnalytics />} />

          <Route path={route.ANALYTICS_OFFLINE.GENERAL} element={<OfflineGeneralAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.ABC} element={<OfflineABCAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.XYZ} element={<OfflineXYZAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.PROFITABILITY} element={<OfflineProfitabilityAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.GROWTH} element={<OfflineGrowthAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.BY_CATEGORY} element={<OfflineByCategoryAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.REGIONS} element={<OfflineRegionAnalytics />} />
          <Route path={route.ANALYTICS_OFFLINE.ASSORTMENT} element={<OfflineAssortmentAnalytics />} />

          <Route path={route.ANALYTICS_TOTAL.GENERAL} element={<TotalGeneralAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.ABC} element={<TotalABCAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.XYZ} element={<TotalXYZAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.PROFITABILITY} element={<TotalProfitabilityAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.GROWTH} element={<TotalGrowthAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.BY_CATEGORY} element={<TotalByCategoryAnalytics />} />
          <Route path={route.ANALYTICS_TOTAL.REGIONS} element={<TotalRegionAnalytics />} />

          <Route path={route.REPORT} element={<Report />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path={route.PROFILES} element={<Profiles />} />
          <Route path={route.REGISTRATION} element={<Registration />} />
        </Route>

      </Route>
    </Route>
    <Route path='*' element={''} />
  </Routes>
);