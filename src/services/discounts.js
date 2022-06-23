import axios from 'axios';
import { useQuery } from 'react-query';

const fetchDiscountDetails = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/weekly_discounts`,
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

export const GetDiscountDetails = (payload) => {
  return useQuery(
    ['weekly_discounts', payload],
    () => fetchDiscountDetails(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data;
      },
    }
  );
};
