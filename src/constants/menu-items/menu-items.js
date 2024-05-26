import {
  BookOutlined,
  CompassOutlined, EnvironmentOutlined, FundOutlined,
  ProductOutlined, RiseOutlined,
  ShoppingOutlined, StockOutlined,
  TeamOutlined, UsergroupAddOutlined,
} from '@ant-design/icons';
import { route } from '../routes/routes';

export const AdminItems = [
  {
    key: route.PROFILES,
    label: 'Профили',
    icon: <TeamOutlined />,
  },
  {
    key: route.REGISTRATION,
    label: 'Добавление менеджера',
    icon: <UsergroupAddOutlined />,
  }
];

export const ManagerItems = [
  {
    key: route.CLIENTS.MAIN,
    label: 'Клиенты',
    icon: <TeamOutlined />,
  },
  {
    key: route.CATEGORIES,
    label: 'Категории',
    icon: <ProductOutlined />,
  },
  {
    key: route.REGIONS,
    label: 'Регионы',
    icon: <CompassOutlined />,
  },
  {
    key: route.PRODUCTS,
    label: 'Товары',
    icon: <ShoppingOutlined />,
  },
  {
    key: route.REPORT,
    label: 'Отчет',
    icon: <BookOutlined />,
  },
  {
    key: 'points',
    label: 'Торговые точки',
    icon: <EnvironmentOutlined />,
    children: [
      {
        key: route.POINTS.OFFLINE,
        label: 'Оффлайн точки',
      },
      {
        key: route.POINTS.MAIN,
        label: 'Пункты выдачи',
      },
      ]
  },
  {
    key: 'online',
    label: 'Онлайн аналитика',
    icon: <RiseOutlined />,
    children: [
      {
        key: route.ANALYTICS.GENERAL,
        label: 'Общая сводка',
      },
      {
        key: route.ANALYTICS.ABC,
        label: 'ABC-анализ',
      },
      {
        key: route.ANALYTICS.XYZ,
        label: 'XYZ-анализ',
      },
      {
        key: route.ANALYTICS.PROFITABILITY,
        label: 'Анализ рентабельности',
      },
      {
        key: route.ANALYTICS.GROWTH,
        label: 'Анализ темпов продаж',
      },
      {
        key: route.ANALYTICS.BY_CATEGORY,
        label: 'Анализ по категориям',
      },
      {
        key: route.ANALYTICS.REGIONS,
        label: 'Региональный анализ',
      },
      {
        key: route.ANALYTICS.CLIENTS,
        label: 'Анализ клиентской базы',
      },
    ],
  },
  {
    key: 'offline',
    label: 'Оффлайн аналитика',
    icon: <StockOutlined />,
    children: [
      {
        key: route.ANALYTICS_OFFLINE.GENERAL,
        label: 'Общая сводка',
      },
      {
        key: route.ANALYTICS_OFFLINE.ABC,
        label: 'ABC-анализ',
      },
      {
        key: route.ANALYTICS_OFFLINE.XYZ,
        label: 'XYZ-анализ',
      },
      {
        key: route.ANALYTICS_OFFLINE.PROFITABILITY,
        label: 'Анализ рентабельности',
      },
      {
        key: route.ANALYTICS_OFFLINE.GROWTH,
        label: 'Анализ темпов продаж',
      },
      {
        key: route.ANALYTICS_OFFLINE.BY_CATEGORY,
        label: 'Анализ по категориям',
      },
      {
        key: route.ANALYTICS_OFFLINE.REGIONS,
        label: 'Региональный анализ',
      },
      {
        key: route.ANALYTICS_OFFLINE.ASSORTMENT,
        label: 'Анализ ассортимента',
      },
    ],
  },
  {
    key: 'total',
    label: 'Общая аналитика',
    icon: <FundOutlined />,
    children: [
      {
        key: route.ANALYTICS_TOTAL.GENERAL,
        label: 'Общая сводка',
      },
      {
        key: route.ANALYTICS_TOTAL.ABC,
        label: 'ABC-анализ',
      },
      {
        key: route.ANALYTICS_TOTAL.XYZ,
        label: 'XYZ-анализ',
      },
      {
        key: route.ANALYTICS_TOTAL.PROFITABILITY,
        label: 'Анализ рентабельности',
      },
      {
        key: route.ANALYTICS_TOTAL.GROWTH,
        label: 'Анализ темпов продаж',
      },
      {
        key: route.ANALYTICS_TOTAL.BY_CATEGORY,
        label: 'Анализ по категориям',
      },
      {
        key: route.ANALYTICS_TOTAL.REGIONS,
        label: 'Региональный анализ',
      },
    ],
  }
]