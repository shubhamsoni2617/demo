import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSimulationResults = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/simulation_results`,
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

export const GetSimulationResults = (payload) => {
  return useQuery(
    ['simulation_results', payload],
    () => fetchSimulationResults(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data.simulation_results;
      },
    }
  );
};
