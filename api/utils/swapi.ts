import axios from 'axios';
import DataType from '../types/DataType';
import config from '../config';

export type SwapiRequest = {
  dataType: DataType;
  query: string;
};

export default {
  async fetchUrl(request: SwapiRequest) {
    return axios
      .get(
        `${config.SWAPI_BASE_URL}/${request.dataType}${request.query}`,
        {
          headers: {
            'Accept-Encoding': 'application/json',
          },
        }
      )
      .then((response) => {
        return {
          [request.dataType]: response.data.result || [],
        };
      })
      .catch((error) => {
        throw error;
      });
  },
};
