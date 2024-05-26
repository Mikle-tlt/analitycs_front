export const GeneralColumns = [
  {
    title: 'Название',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Категория',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center'
  },
  {
    title: 'Выручка',
    dataIndex: 'revenue',
    key: 'revenue',
    align: 'center'
  },
  {
    title: 'Затраты',
    dataIndex: 'costPrice',
    key: 'costPrice',
    align: 'center'
  },
  {
    title: 'Прибыль',
    dataIndex: 'different',
    key: 'different',
    align: 'center'
  },
];

export const ABCColumns = [
  {
    title: 'Название',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Категория',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center'
  },
  {
    title: 'Выручка',
    dataIndex: 'revenue',
    key: 'revenue',
    align: 'center'
  },
  {
    title: 'Затраты',
    dataIndex: 'costPrice',
    key: 'costPrice',
    align: 'center'
  },
  {
    title: 'Прибыль',
    dataIndex: 'different',
    key: 'different',
    align: 'center'
  },
  {
    title: 'Доля прибыли',
    dataIndex: 'profitShare',
    key: 'profitShare',
    align: 'center',
    render: (text) => <> { text }{ text !== 0 ? '%' : '' } </>
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
    align: 'center'
  },
];

export const XYZColumns = [
  {
    title: 'Название',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Категория',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Выручка',
    dataIndex: 'revenue',
    key: 'revenue',
    align: 'center'
  },
  {
    title: 'Средняя выручка',
    dataIndex: 'revenueAverage',
    key: 'revenueAverage',
    align: 'center'
  },
  {
    title: 'Cредне-взвешенное отклонение',
    dataIndex: 'standardDeviation',
    key: 'standardDeviation',
    align: 'center'
  },
  {
    title: 'Cредне-квадратическое отклонение',
    dataIndex: 'rms',
    key: 'rms',
    align: 'center',
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
    align: 'center'
  },
];

export const ProfitabilityColumns = [
  {
    title: 'Название',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Категория',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Первый период',
    dataIndex: 'firstPeriod',
    key: 'firstPeriod',
    align: 'center',
    render: (text) => <>~  { text }{ text !== 0 ? '%' : '' } </>
  },
  {
    title: 'Второй период',
    dataIndex: 'secondPeriod',
    key: 'secondPeriod',
    align: 'center',
    render: (text) => <>~  { text }{ text !== 0 ? '%' : '' } </>
  }
];

export const CustomersColumns = [
  {
    title: 'Месяц',
    dataIndex: 'month',
    key: 'month',
    align: 'center',
  },
  {
    title: 'ОКБ',
    dataIndex: 'okb',
    key: 'okb',
    align: 'center',
  },
  {
    title: 'АКБ',
    dataIndex: 'akb',
    key: 'akb',
    align: 'center',
  },
  {
    title: 'ЭПБ',
    dataIndex: 'epb',
    key: 'epb',
    align: 'center',
  },
];