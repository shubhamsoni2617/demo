import axios from 'axios';
import { useQuery } from 'react-query';

const fetchDetails = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/product_details`,
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

const fetchProductPerformance = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/product_performance`,
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

export const GetProductDetails = (payload) => {
  return useQuery(['product_details', payload], () => fetchDetails(payload), {
    enabled: false,
    select: (data) => {
      return data.data;
    },
  });
};

export const GetProductPerformance = (payload) => {
  return useQuery(
    ['product_performance', payload],
    () => fetchProductPerformance(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data;
      },
    }
  );
};
