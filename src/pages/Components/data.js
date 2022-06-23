import { theme } from '../../theme';

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

export const radioOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
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

export const tabs = [
  {
    label: 'Overall',
    id: 'overall',
  },
  {
    label: 'Product',
    id: 'product',
  },
  {
    label: 'Category',
    id: 'category',
  },
  {
    label: 'Department',
    id: 'department',
  },
];

export const discountTabs = {
  simulate: [
    {
      label: 'Planned',
      id: 'planned',
    },
  ],
  optimize: [
    {
      label: 'Planned',
      id: 'planned',
    },
    {
      label: 'Scenario 01',
      id: 'scenario_one',
    },
  ],
};

export const maximizationMetricsOptions = [
  {
    label: 'Margin $',
    value: 'Margin $',
  },
  {
    label: 'Revenue $',
    value: 'Revenue $',
  },
];

export const offerType = [
  {
    label: '% Off',
    value: 'Off',
  },
  {
    label: 'BXGY',
    value: 'BXGY',
  },
];

export const discountLevels = [
  {
    label: 'Overall',
    value: 'overall',
  },
  {
    label: 'Product',
    value: 'product',
  },
];

export const constraintLevels = [
  {
    label: 'All Stores',
    value: 'all',
  },
  {
    label: 'By store tiers',
    value: 'tiers',
  },
];

export const treeMapMetrics = [
  {
    key: 'gross_margin',
    display: 'GM$',
  },
  {
    key: 'sales_units',
    display: 'Sales Units',
  },
  {
    key: 'sales_amount',
    display: 'Sales $',
  },
  {
    key: 'aur',
    display: 'AUR',
  },
  {
    key: 'gross_margin_percent',
    display: 'GM%',
  },
  {
    key: 'sell_through_percent',
    display: 'ST%',
  },
];

export const treeMapData = [
  {
    metric_name: 'gross_margin',
    metric_unit: '$',
    metric_display_name: 'GM$',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 208812,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-9.30',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-5.08',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-2.10',
          },
        ],
        isLocked: false,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 198812,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-7.30',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-5.84',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '2.10',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 194479,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-9.12',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-3.57',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '4.36',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 130214,
        status: 'over',
        color: '#B1BEFF',
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '9.12',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '3.17',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '3.17',
          },
        ],
      },
    ],
  },
  {
    metric_name: 'sales_units',
    metric_unit: '',
    metric_display_name: 'Sales Units',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 0,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-12.67',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-8.83',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-4.59',
          },
        ],
        isLocked: true,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 6606,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-21.37',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-13.58',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '4.67',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 2014,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-26.17',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '6.31',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '6.31',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 2914,
        status: 'over',
        color: '#B1BEFF',
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '16.28',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-4.15',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '2.73',
          },
        ],
      },
    ],
  },
  {
    metric_name: 'sales_amount',
    metric_unit: '$',
    metric_display_name: 'Sales $',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 0,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-11.27',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-7.73',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '3.80',
          },
        ],
        isLocked: true,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 86236,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-17.13',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-12.56',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-7.43',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 85916,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-19.20',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '2.20',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '2.20',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 95257,
        status: 'track',
        color: theme.palette.bgSuccess,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '4.24',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '2.50',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '5.87',
          },
        ],
      },
    ],
  },
  {
    metric_name: 'aur',
    metric_unit: '$',
    metric_display_name: 'AUR',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 0,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-5.03',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-3.29',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '4.16',
          },
        ],
        isLocked: true,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 10.92,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-8.13',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-4.07',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '2.46',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 10.92,
        status: 'track',
        color: theme.palette.bgSuccess,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '3.21',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-5.86',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '1.89',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 10.37,
        status: 'over',
        color: '#B1BEFF',
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '14.51',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '2.45',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '14.16',
          },
        ],
      },
    ],
  },
  {
    metric_name: 'gross_margin_percent',
    metric_unit: '%',
    metric_display_name: 'GM%',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 0,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-26.93',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-9.37',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '5.60',
          },
        ],
        isLocked: true,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 20.6,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-28.16',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-8.66',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-4.75',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 21.34,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-18.42',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '3.36',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '3.36',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 26.8,
        status: 'over',
        color: '#B1BEFF',
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '6.82',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-3.21',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-3.21',
          },
        ],
      },
    ],
  },
  {
    metric_name: 'sell_through_percent',
    metric_unit: '%',
    metric_display_name: 'ST%',
    items: [
      {
        id: '1',
        name: 'MENS WEAR',
        value: 0,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-24.52',
          },
          {
            variance_type: ['planned', 'ia_recommendation'],
            value: '-11.93',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-2.59',
          },
        ],
        isLocked: true,
      },
      {
        id: '2',
        name: "WOMEN'S WEAR",
        value: 72.68,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-28.81',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-16.37',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-7.44',
          },
        ],
      },
      {
        id: '3',
        name: 'KIDS WEAR',
        value: 79.36,
        status: 'under',
        color: theme.palette.bgDanger,
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '-16.47',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '-6.03',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '-4.76',
          },
        ],
      },
      {
        id: '4',
        name: 'INFANT WEAR',
        value: 89.56,
        status: 'over',
        color: '#B1BEFF',
        drilldown: true,
        variance: [
          {
            variance_type: ['planned', 'actual'],
            value: '6.27',
          },
          {
            variance_type: ['planned', 'current_forecast'],
            value: '2.31',
          },
          {
            variance_type: ['planned', 'final_forecast'],
            value: '2.31',
          },
        ],
      },
    ],
  },
];

export const fiscalCalendar = {
  activeQuarter: [
    {
      label: 'Q1 2022',
      value: 'q1',
    },
  ],
  activeMonth: [
    {
      label: 'March',
      value: 'm3',
    },
  ],
  activeFrequency: [
    {
      label: 'Weekly',
      value: 'week',
    },
  ],
  fiscalQuarters: [
    {
      label: 'Q1 2022',
      value: 'q1',
    },
    {
      label: 'Q2 2022',
      value: 'q2',
    },
    {
      label: 'Q3 2022',
      value: 'q3',
    },
    {
      label: 'Q4 2022',
      value: 'q4',
    },
  ],
  fiscalMonths: [
    {
      label: 'Jan',
      value: 'm1',
    },
    {
      label: 'Feb',
      value: 'm2',
    },
    {
      label: 'March',
      value: 'm3',
    },
    {
      label: 'April',
      value: 'm4',
    },
    {
      label: 'May',
      value: 'm5',
    },
    {
      label: 'June',
      value: 'm6',
    },
    {
      label: 'July',
      value: 'm7',
    },
    {
      label: 'August',
      value: 'm8',
    },
    {
      label: 'September',
      value: 'm9',
    },
    {
      label: 'October',
      value: 'm10',
    },
    {
      label: 'November',
      value: 'm11',
    },
    {
      label: 'December',
      value: 'm12',
    },
  ],
  frequencyOptions: [
    {
      label: 'Weekly',
      value: 'week',
    },
    {
      label: 'Monthly',
      value: 'month',
    },
    {
      label: 'Quarterly',
      value: 'quarter',
    },
  ],
};

export const dataCardValues = [
  {
    label: 'Revenue',
    type: 'revenue',
    value: '$84,776,577',
    trend: 'up',
    trendValue: 1,
    subLabel: 'Actual/Predicted',
    change: 'down',
    changeValue: '0.2 M',
    color: '#d4c628',
    background: '#f9f6df',
    changeColor: '#ef605f',
    metrics: [
      {
        label: 'Recommended',
        value: '$84,954,075',
      },
      {
        label: 'Last Week',
        value: '$48,254,075',
      },
      {
        label: 'Planned',
        value: '$84,000,000',
      },
      {
        label: 'Life to date',
        value: '$84,954,075',
      },
    ],
  },
  {
    label: 'Sales Units',
    type: 'sales',
    value: '$84,776,577',
    trend: 'up',
    trendValue: 2,
    subLabel: 'Actual/Predicted',
    change: 'down',
    changeValue: '0.05 M',
    color: '#f59d3d',
    background: '#fff5e9',
    changeColor: '#ef605f',
    metrics: [
      {
        label: 'Recommended',
        value: '84,954,075',
      },
      {
        label: 'Last Week',
        value: '48,254,075',
      },
      {
        label: 'Planned',
        value: '84,000,000',
      },
      {
        label: 'Life to date',
        value: '84,954,075',
      },
    ],
  },
  {
    label: 'Margin',
    type: 'margin',
    value: '$84,776,577',
    trend: 'down',
    trendValue: 7,
    subLabel: 'Actual/Predicted',
    change: 'down',
    changeValue: '0.2 M',
    color: '#52c482',
    background: '#ebf9f1',
    changeColor: '#ef605f',
    metrics: [
      {
        label: 'Recommended',
        value: '$84,954,075',
      },
      {
        label: 'Last Week',
        value: '$48,254,075',
      },
      {
        label: 'Planned',
        value: '$84,000,000',
      },
      {
        label: 'Life to date',
        value: '$84,954,075',
      },
    ],
  },
  {
    label: 'Sell Through',
    type: 'sell',
    value: '11%',
    trend: 'up',
    trendValue: 7,
    subLabel: 'Actual/Predicted',
    change: 'down',
    changeValue: '1%',
    color: '#557386',
    background: '#e5eaed',
    changeColor: '#ef605f',
    metrics: [
      {
        label: 'Recommended',
        value: '12%',
      },
      {
        label: 'Last Week',
        value: '3%',
      },
      {
        label: 'Planned',
        value: '10%',
      },
      {
        label: 'Life to date',
        value: '60%',
      },
    ],
  },
];

export const dataLabels = {
  'On Track': 10,
  'Exception-High': 2,
  'Move To Clearance': 6,
  'Clearance Date Change': 8,
};
