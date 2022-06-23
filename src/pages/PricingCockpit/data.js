export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export const tableRadioOptions = [
  {
    label: 'Collection Total',
    value: 'collection_total',
  },
  {
    label: 'Collection',
    value: 'collection',
  },
  {
    label: 'Product Group',
    value: 'product_group',
  },
  {
    label: 'Product',
    value: 'product',
  },
];

export const dataHeaders = [
  {
    label: 'KPI',
    id: 'kpi',
    align: 'left',
    type: 'header',
    textTransform: 'capitalize',
  },
  {
    label: 'CURRENT',
    id: 'current',
    align: 'center',
    type: 'text',
    suffix: '%',
    textTransform: 'capitalize',
  },
  {
    label: 'RECOMMENDED',
    id: 'recommended',
    align: 'center',
    type: 'text',
    suffix: '%',
    textTransform: 'capitalize',
  },
  {
    label: 'FINALIZED',
    id: 'finalized',
    align: 'center',
    type: 'difference',
    suffix: '%',
    textTransform: 'capitalize',
  },
];

export const data = [
  {
    kpi: 'GM$',
    current: -9.3,
    recommended: -5.08,
    finalized: -2.1,
  },
  {
    kpi: 'Sales Unit',
    current: -12.67,
    recommended: -8.83,
    finalized: -4.59,
  },
  {
    kpi: 'Sales $',
    current: -11.3,
    recommended: -7.73,
    finalized: 3.8,
  },
  {
    kpi: 'AUR',
    current: -5.03,
    recommended: -3.29,
    finalized: 4.16,
  },
  {
    kpi: 'GM%',
    current: -26.93,
    recommended: -9.37,
    finalized: 5.6,
  },
  {
    kpi: 'ST%',
    current: -24.52,
    recommended: -11.93,
    finalized: -2.59,
  },
];

export const filtersList = [
  {
    id: 'channel_exclusive_flag',
    isMulti: true,
    label: 'Channel Exclusive Flag',
    index: 0,
  },
  {
    id: 'brand',
    isMulti: true,
    label: 'Brand',
    index: 1,
  },
  {
    id: 'sbu',
    isMulti: true,
    label: 'SBU',
    index: 2,
  },
  {
    id: 'department',
    isMulti: true,
    label: 'Department',
    index: 3,
  },
  {
    id: 'class',
    isMulti: true,
    label: 'Class',
    index: 4,
  },
  {
    id: 'sub_class',
    isMulti: true,
    label: 'Sub Class',
    index: 5,
  },
  {
    id: 'collection_total',
    isMulti: true,
    label: 'Collection Total',
    index: 6,
  },
];

export const priceData = {
  gross_margin: [
    {
      id: 'planned',
      name: 'Planned',
      data: [105321, 115321, 104191, 114191],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [87130, 97130, 95714, 125714],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [94321, 108202, 103245, 116587],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [101682, 108202, 103245, 116587],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [101682, 118450, 105004, 116587],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [81682, 100549, 93231, 101450],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [79519, 96385, 89109, 102675],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
  sales_units: [
    {
      id: 'planned',
      name: 'Planned',
      data: [2560, 2960, 2831, 2531],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [1906, 2106, 2014, 2914],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [2041, 2800, 2931, 2451],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [2410, 2800, 2931, 2451],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [2410, 3000, 2931, 2590],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [2160, 2500, 2581, 23890],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [2015, 2590, 2167, 22456],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
  sales_amount: [
    {
      id: 'planned',
      name: 'Planned',
      data: [91021, 98051, 94371, 92142],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [79236, 86236, 85916, 95257],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [89427, 95904, 95532, 93521],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [92421, 95904, 95532, 93521],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [92421, 97000, 95532, 96000],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [81021, 90498, 96345, 90015],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [95021, 85321, 90476, 86502],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
  aur: [
    {
      id: 'planned',
      name: 'Planned',
      data: [11.25, 12.01, 10.5, 9.7],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [10.64, 10.92, 10.92, 10.37],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [10.85, 11.56, 9.86, 9.85],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [11.55, 11.56, 9.86, 9.85],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [11.55, 12.51, 10.7, 10.34],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [10.25, 10, 9.43, 8.97],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [9.81, 11.34, 9.98, 8.45],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
  gross_margin_percent: [
    {
      id: 'planned',
      name: 'Planned',
      data: [27, 28.12, 25.18, 23.58],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [19, 20.6, 21.34, 26.8],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [25, 27.15, 25.87, 22.89],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [28, 27.15, 25.87, 22.89],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [28, 27.95, 25.87, 22.89],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [30, 25.16, 23.47, 19.45],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [23.45, 23.3, 20.98, 18.87],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
  sell_through_percent: [
    {
      id: 'planned',
      name: 'Planned',
      data: [83.54, 89.17, 85.24, 83.84],
      color: '#F49125',
      dashStyle: 'Solid',
    },
    {
      id: 'actual',
      name: 'Actual',
      data: [68.31, 72.68, 79.36, 89.56],
      color: '#65A0EF',
      dashStyle: 'Solid',
    },
    {
      id: 'current_forecast',
      name: 'Current Forecast',
      data: [80.08, 85.23, 82.45, 85.24],
      color: '#8373FF',
      dashStyle: 'Dash',
    },
    {
      id: 'ia_recommendation',
      name: 'IA Recommendation',
      data: [83.05, 85.23, 82.45, 85.24],
      color: '#C95BAC',
      dashStyle: 'Dash',
    },
    {
      id: 'final_forecast',
      name: 'Final Forecast',
      data: [83.05, 88.47, 84.66, 85.24],
      color: '#13AD91',
      dashStyle: 'Dash',
    },
    {
      id: 'ly',
      name: 'LY',
      data: [80.54, 80.63, 80.45, 84.54],
      visible: false,
      color: '#CECECE',
      dashStyle: 'Solid',
    },
    {
      id: 'lly',
      name: 'LLY',
      data: [85, 82.6, 78.34, 81.94],
      visible: false,
      color: '#696969',
      dashStyle: 'Solid',
    },
  ],
};

export const cumulativeData = {
  gross_margin: {
    planned: '$105,321',
    actual: '$87,130',
    current_forecast: '$94,321',
    ia_recommendation: '$101,682',
    final_forecast: '$101,682',
    ly: '$81,682',
    lly: '$79,519',
  },
  sales_units: {
    planned: '2,560',
    actual: '1,906',
    current_forecast: '2,041',
    ia_recommendation: '2,410',
    final_forecast: '2,410',
    ly: '2,160',
    lly: '2,015',
  },
  sales_amount: {
    planned: '$91,021',
    actual: '$79,236',
    current_forecast: '$89,427',
    ia_recommendation: '$92,421',
    final_forecast: '$92,421',
    ly: '$81,021',
    lly: '$95,021',
  },
  aur: {
    planned: '$11.25',
    actual: '$10.64',
    current_forecast: '$10.85',
    ia_recommendation: '$11.55',
    final_forecast: '$11.55',
    ly: '$10.25',
    lly: '$9.81',
  },
  gross_margin_percent: {
    planned: '27',
    actual: '19',
    current_forecast: '25',
    ia_recommendation: '28',
    final_forecast: '28',
    ly: '30',
    lly: '23.45',
  },
  sell_through_percent: {
    planned: '83.54',
    actual: '68.31',
    current_forecast: '80.08',
    ia_recommendation: '83.05',
    final_forecast: '83.05',
    ly: '80.54',
    lly: '85.00',
  },
};

export const tableTabs = [
  {
    label: 'Reg Price',
    id: 'regular_price',
  },
  {
    label: 'Clearance',
    id: 'clearance',
  },
];
