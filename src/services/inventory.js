import axios from 'axios';
import { useQuery } from 'react-query';

const fetchInventoryDetails = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/inventory_info`,
    payload,
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

export const GetInventoryDetails = (payload) => {
  return useQuery(
    ['inventory_info', payload],
    () => fetchInventoryDetails(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data.inventory_info[0];
      },
    }
  );
};
