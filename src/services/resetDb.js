import axios from 'axios';
// import { useQuery } from 'react-query';

export const delete_category_treemap = async () => {
  return await axios.delete(
    `https://thorough-parrot-11.hasura.app/api/rest/Drop_all_tables`,
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

export const post_data = (url, payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/${url}`,
    { objects: payload },
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

export const getSheetData = async (data) => {
  try {
    const sheetId = '1KsW7qPugjz_ddQTp8gjlCmyX7eLpgk8K_nFRi5pcaSo';
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${
        data.key
      }?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
    );
    let configHeader = response.data.values[0];
    const newData = [];
    for (let i = 1; i < response?.data?.values.length; i++) {
      let newRow = {};
      for (let j = 0; j < configHeader.length; j++) {
        const cellData = response?.data?.values[i][j] || null;
        // newRow[configHeader[j]] = isNaN(cellData) ? cellData : Number(cellData);
        newRow[configHeader[j]] = cellData;
      }
      newData.push(newRow);
    }
    return newData;
    // post_data(data.url, newData);
  } catch (e) {
    alert(
      'Something went wrong while fetching data from google sheet. please try migrating the Database again'
    );
  }
};

export const allSheetName = [
  { key: 'category_treemap', url: 'insert_category_treemap' },
  { key: 'chart', url: 'insert_chart' },
  { key: 'filters', url: 'insert_filters' },
  { key: 'filter_values', url: 'insert_filter_values' },
  { key: 'product_info', url: 'insert_product_info' },
  { key: 'product_groups', url: 'insert_product_groups' },
  { key: 'product_metrics', url: 'insert_product_metrics' },
  { key: 'sub_category_treemap', url: 'insert_sub_category_treemap' },
  { key: 'product_performance', url: 'insert_product_product_performance' },
  { key: 'inventory_info', url: 'insert_inventory_info' },
  { key: 'weekly_discounts', url: 'insert_weekly_discounts' },
  { key: 'simulation_results', url: 'insert_simulation_results' },
  { key: 'sell_through_chart', url: 'insertsell_through_table' },
  { key: 'sell_through_steps', url: 'insert_sell_through_steps' },
  { key: 'margin_chart', url: 'insert_margin_chart' },
];

export const allPromise = [];

for (let elem of allSheetName) {
  allPromise.push(() => getSheetData(elem));
}
