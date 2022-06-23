import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProductGroups = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/product_groups`,
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

export const GetProductGroups = (payload) => {
  return useQuery(
    ['product_groups', payload],
    () => fetchProductGroups(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data.product_groups;
      },
    }
  );
};
