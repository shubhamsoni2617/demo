import axios from 'axios';
import { useQuery } from 'react-query';

const fetchChartData = () => {
  return axios.get(
    `https://thorough-parrot-11.hasura.app/api/rest/chart_data`,
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'ehPa3S5hvzjVuLAy5zPon5XrymgqpiPgDMqHXJzkip3XpbNMpZg3HcXo80grtAgC',
      },
    }
  );
};

const fetchPerformanceChartData = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/sell_through_performance`,
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

const fetchPerformanceOptimizationChartData = (payload) => {
  return axios.post(
    `https://thorough-parrot-11.hasura.app/api/rest/sell_through_optimization`,
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

export const GetChartData = () => {
  return useQuery(['chart_data'], () => fetchChartData(), {
    enabled: false,
    select: (data) => {
      return data.data;
    },
  });
};

export const GetPerformanceChartData = (payload) => {
  return useQuery(
    ['sell_through_performance', payload],
    () => fetchPerformanceChartData(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data;
      },
    }
  );
};

export const GetPerformanceOptimizationChartData = (payload) => {
  return useQuery(
    ['sell_through_optimization', payload],
    () => fetchPerformanceOptimizationChartData(payload),
    {
      enabled: false,
      select: (data) => {
        return data.data;
      },
    }
  );
};
