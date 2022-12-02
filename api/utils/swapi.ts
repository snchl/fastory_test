import axios from 'axios';
import config from '../config';

export default {
  async fetchUrl(path: string) {
    return axios
      .get(`${config.SWAPI_BASE_URL}${path}`, {
        headers: {
          'Accept-Encoding': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
