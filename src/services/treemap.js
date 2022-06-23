import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCategoriesTreemap = () => {
  return axios.get(
    `https://thorough-parrot-11.hasura.app/api/rest/categories_treemap`,
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

const fetchSubCategoryTreemap = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/sub_category_treemap`,
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

export const GetCategoriesTreemap = () => {
  return useQuery(['categories_treemap'], () => fetchCategoriesTreemap(), {
    enabled: false,
    select: (data) => {
      return data.data;
    },
  });
};

export const GetSubCategoriesTreemap = (payload) => {
  return useQuery(
    ['sub_category_treemap', payload],
    () => fetchSubCategoryTreemap(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data;
      },
    }
  );
};
