export const tableConfig = [
  {
    pinned: 'left',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    suppressMenu: true,
    sortable: false,
    filter: false,
    width: 52,
  },
  {
    headerName: 'Product/product group',
    field: 'product_group',
    type: 'text',
    align: 'left',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: false,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: false,
    is_exception: false,
    has_actions: true,
    pinned: 'left',
    cellRenderer: 'actionCellRenderer',
  },
  {
    headerName: 'Current Lifecycle',
    field: 'current_lifecycle',
    type: 'text',
    align: 'center',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: false,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: false,
    is_exception: false,
    has_actions: false,
    cellStyle: { 'justify-content': 'center' },
  },
  {
    headerName: 'Status',
    field: 'status_text',
    type: 'text',
    align: 'center',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: false,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: true,
    is_exception: false,
    has_actions: false,
    cellStyle: { 'justify-content': 'center' },
    cellRenderer: 'statusCellRenderer',
  },
  {
    headerName: 'Exceptions',
    field: 'exceptions_text',
    type: 'text',
    align: 'center',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: false,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: false,
    is_exception: true,
    has_actions: false,
    cellStyle: { 'justify-content': 'center' },
    cellRenderer: 'exceptionsCellRenderer',
  },
  {
    headerName: 'Planned Discount',
    field: 'planned_discount',
    type: 'text',
    align: 'center',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: true,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: false,
    is_exception: false,
    has_actions: false,
    cellStyle: { 'justify-content': 'center' },
    cellRenderer: 'blockCellRenderer',
  },
  {
    headerName: 'Refreshed Discount',
    field: 'refreshed_discount',
    type: 'text',
    align: 'center',
    textTransform: 'capitalize',
    suffix: '',
    checkbox: false,
    is_link: false,
    is_block: false,
    is_dropdown: false,
    is_diff: false,
    is_elasticity_confidence: false,
    is_status: false,
    is_exception: false,
    has_actions: false,
    cellStyle: { 'justify-content': 'center' },
  },
  {
    headerName: 'Sell Through%',
    children: [
      {
        headerName: 'Original Planned',
        field: 'sell_through_original_planned',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'Achievable',
        field: 'sell_through_achievable',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
    ],
  },
  {
    headerName: 'Margin($)',
    children: [
      {
        headerName: 'Original Planned',
        field: 'margin_original_planned',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'Achievable',
        field: 'margin_achievable',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
    ],
  },
  {
    headerName: 'Variance ST Plan',
    children: [
      {
        headerName: 'QTD',
        field: 'variance_st_plan_qtd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'MTD',
        field: 'variance_st_plan_mtd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'LW',
        field: 'variance_st_plan_lw',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'LTD',
        field: 'variance_st_plan_ltd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
    ],
  },
  {
    headerName: 'Variance Marign Plan',
    children: [
      {
        headerName: 'QTD',
        field: 'variance_margin_plan_qtd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'MTD',
        field: 'variance_margin_plan_mtd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'LW',
        field: 'variance_margin_plan_lw',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
      {
        headerName: 'LTD',
        field: 'variance_margin_plan_ltd',
        type: 'text',
        align: 'center',
        textTransform: 'capitalize',
        suffix: '',
        checkbox: false,
        is_link: false,
        is_block: false,
        is_dropdown: false,
        is_diff: false,
        is_elasticity_confidence: false,
        is_status: false,
        is_exception: false,
        has_actions: false,
        cellStyle: { 'justify-content': 'center' },
      },
    ],
  },
];

export const performanceTableConfig = {
  plan_level: [
    {
      headerName: 'Plan Level',
      field: 'plan_level',
      filter: false,
      suppressMenu: true,
      width: 124,
    },
    {
      headerName: 'Time Period',
      field: 'time_period',
      filter: false,
      suppressMenu: true,
      width: 166,
    },
    {
      headerName: '# Bins',
      field: 'bins',
      filter: false,
      suppressMenu: true,
      width: 98,
    },
    {
      headerName: '# Store Tier',
      field: 'tier',
      filter: false,
      suppressMenu: true,
      width: 134,
    },
    {
      headerName: '# Total Products',
      field: 'total_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: '# Filtered Proudcts',
      field: 'filtered_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: 'MD%',
      field: 'md',
      filter: false,
      suppressMenu: true,
      width: 94,
    },
  ],
  plan_week: [
    {
      headerName: 'Plan Level',
      field: 'plan_level',
      filter: false,
      suppressMenu: true,
      width: 124,
    },
    {
      headerName: 'Time Period',
      field: 'time_period',
      filter: false,
      suppressMenu: true,
      width: 166,
    },
    {
      headerName: '# Bins',
      field: 'bins',
      filter: false,
      suppressMenu: true,
      width: 98,
    },
    {
      headerName: '# Store Tier',
      field: 'tier',
      filter: false,
      suppressMenu: true,
      width: 134,
    },
    {
      headerName: '# Total Products',
      field: 'total_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: '# Filtered Proudcts',
      field: 'filtered_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: 'MD%',
      field: 'md',
      filter: false,
      suppressMenu: true,
      width: 94,
    },
  ],
  store_week: [
    {
      headerName: 'Plan Level',
      field: 'plan_level',
      filter: false,
      suppressMenu: true,
      width: 124,
    },
    {
      headerName: 'Time Period',
      field: 'time_period',
      filter: false,
      suppressMenu: true,
      width: 166,
    },
    {
      headerName: '# Bins',
      field: 'bins',
      filter: false,
      suppressMenu: true,
      width: 98,
    },
    {
      headerName: '# Store Tier',
      field: 'tier',
      filter: false,
      suppressMenu: true,
      width: 134,
    },
    {
      headerName: '# Total Products',
      field: 'total_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: '# Filtered Proudcts',
      field: 'filtered_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: 'MD%',
      field: 'md',
      filter: false,
      suppressMenu: true,
      width: 94,
    },
  ],
  details: [
    {
      headerName: 'Plan Level',
      field: 'plan_level',
      filter: false,
      suppressMenu: true,
      width: 124,
    },
    {
      headerName: 'Time Period',
      field: 'time_period',
      filter: false,
      suppressMenu: true,
      width: 166,
    },
    {
      headerName: '# Bins',
      field: 'bins',
      filter: false,
      suppressMenu: true,
      width: 98,
    },
    {
      headerName: '# Store Tier',
      field: 'tier',
      filter: false,
      suppressMenu: true,
      width: 134,
    },
    {
      headerName: '# Total Products',
      field: 'total_products',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: 'Product ID',
      field: 'product_id',
      filter: false,
      suppressMenu: true,
      width: 156,
    },
    {
      headerName: 'MD%',
      field: 'md',
      filter: false,
      suppressMenu: true,
      width: 94,
    },
  ],
};

export const promoDiscountsConfig = [
  {
    headerName: 'W1',
    field: 'week_one',
    filter: false,
    suppressMenu: true,
    width: 103,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W2',
    field: 'week_two',
    filter: false,
    suppressMenu: true,
    width: 104,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W3',
    field: 'week_three',
    filter: false,
    suppressMenu: true,
    width: 103,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W4',
    field: 'week_four',
    filter: false,
    suppressMenu: true,
    width: 103,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W5',
    field: 'week_five',
    filter: false,
    suppressMenu: true,
    width: 104,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W6',
    field: 'week_six',
    filter: false,
    suppressMenu: true,
    width: 103,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W7',
    field: 'week_seven',
    filter: false,
    suppressMenu: true,
    width: 103,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'W8',
    field: 'week_eight',
    filter: false,
    suppressMenu: true,
    width: 104,
    cellRenderer: 'percentCellRenderer',
  },
];

export const simulationsConfig = {
  0: [
    {
      headerName: 'Scenario',
      field: 'scenario',
      filter: false,
      suppressMenu: true,
      width: 103,
    },
    {
      headerName: 'ST%',
      field: 'sell_thorugh_percentage',
      filter: false,
      suppressMenu: true,
      width: 72,
    },
    {
      headerName: 'Mar. %',
      field: 'margin_percentage',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'AUR',
      field: 'aur',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'AUM',
      field: 'aum',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'Budget Utilised',
      field: 'budget_utilised',
      filter: false,
      suppressMenu: true,
      width: 144,
    },
    {
      headerName: 'Left over Inventory',
      field: 'inventory_left',
      filter: false,
      suppressMenu: true,
      width: 160,
    },
    {
      headerName: 'Revneue',
      field: 'revenue',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Mar.($)',
      field: 'margin',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Units',
      field: 'units',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Affinity',
      field: 'affinity',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Canni..',
      field: 'canni',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
  ],
  1: [
    {
      headerName: 'Scenario',
      field: 'scenario',
      filter: false,
      checkboxSelection: true,
      suppressMenu: true,
      width: 103,
    },
    {
      headerName: 'ST%',
      field: 'sell_thorugh_percentage',
      filter: false,
      suppressMenu: true,
      width: 72,
    },
    {
      headerName: 'Mar. %',
      field: 'margin_percentage',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'AUR',
      field: 'aur',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'AUM',
      field: 'aum',
      filter: false,
      suppressMenu: true,
      width: 88,
    },
    {
      headerName: 'Budget Utilised',
      field: 'budget_utilised',
      filter: false,
      suppressMenu: true,
      width: 144,
    },
    {
      headerName: 'Left over Inventory',
      field: 'inventory_left',
      filter: false,
      suppressMenu: true,
      width: 160,
    },
    {
      headerName: 'Revneue',
      field: 'revenue',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Mar.($)',
      field: 'margin',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Units',
      field: 'units',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Affinity',
      field: 'affinity',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
    {
      headerName: 'Canni..',
      field: 'canni',
      filter: false,
      suppressMenu: true,
      width: 104,
    },
  ],
};
