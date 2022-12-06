import axios, { AxiosError } from 'axios';
import DataType from '../types/DataType';
import config from '../config';

export type SwapiRequest = {
  dataType: DataType;
  query?: string;
  id?: number;
};

export default {
  async fetchUrl(request: SwapiRequest) {
    return axios
      .get(
        `${config.SWAPI_BASE_URL}/${request.dataType}/${
          request.id ? request.id : ''
        }${request.id ? '' : request.query}`,
        {
          headers: {
            'Accept-Encoding': 'application/json',
          },
        }
      )
      .then((response) => {
        return {
          [request.dataType]:
            response.data.results || response.data.result || [],
        };
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },
};
