import axios from 'axios';
import { useQuery } from 'react-query';

const fetchFilters = () => {
  return axios.get(
    `https://thorough-parrot-11.hasura.app/api/rest/get_filters`,
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

export const GetFilters = () => {
  return useQuery(['filters'], () => fetchFilters(), {
    enabled: false,
    select: (data) => {
      return data.data.filters;
    },
  });
};
