const pointsRoute = {
  MAIN: '/points',
  OFFLINE: '/points/offline',
  OFFLINE_PRODUCTS: '/points/offline/:offlinePointId/products',
  OFFLINE_BUYS: '/points/offline/:offlinePointId/buys',
  OFFLINE_BUYS_DETAILS: '/points/offline/:offlinePointId/buys/:offlineBuyId/details'
}

const clientsRoute = {
  MAIN: '/clients',
  BUYS: '/clients/:clientId/buys',
  BUYS_DETAILS: '/clients/:clientId/buys/:buyId/details'
}

const analyticsOnlineRoute = {
  GENERAL: 'analytics/online/general',
  ABC: 'analytics/online/abc',
  XYZ: 'analytics/online/xyz',
  GROWTH: 'analytics/online/growth',
  PROFITABILITY: 'analytics/online/profitability',
  BY_CATEGORY: 'analytics/online/by_category',
  REGIONS: 'analytics/online/regions',
  CLIENTS: 'analytics/online/clients'
}

const analyticsOfflineRoute = {
  GENERAL: 'analytics/offline/general',
  ABC: 'analytics/offline/abc',
  XYZ: 'analytics/offline/xyz',
  GROWTH: 'analytics/offline/growth',
  PROFITABILITY: 'analytics/offline/profitability',
  BY_CATEGORY: 'analytics/offline/by_category',
  REGIONS: 'analytics/offline/regions',
  ASSORTMENT: 'analytics/offline/assortment'
}

const analyticsTotalRoute = {
  GENERAL: 'analytics/total/general',
  ABC: 'analytics/total/abc',
  XYZ: 'analytics/total/xyz',
  GROWTH: 'analytics/total/growth',
  PROFITABILITY: 'analytics/total/profitability',
  BY_CATEGORY: 'analytics/total/by_category',
  REGIONS: 'analytics/total/regions'
}

export const route = {
  LOGIN: '/auth',
  REGISTRATION: '/registration',
  PROFILES: '/profiles',
  CATEGORIES: '/categories',
  REGIONS: '/regions',
  PRODUCTS: '/products',
  REPORT: '/report',
  POINTS: pointsRoute,
  CLIENTS: clientsRoute,
  ANALYTICS: analyticsOnlineRoute,
  ANALYTICS_OFFLINE: analyticsOfflineRoute,
  ANALYTICS_TOTAL: analyticsTotalRoute
}
