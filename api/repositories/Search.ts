import Hapi from '@hapi/hapi';
import swapi from '../utils/swapi';

export default {
  async search(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    if (!request.query.search) {
      return h
        .response('Missing search query params')
        .code(400)
        .message('Bad request');
    }

    const swapiRequests = [
      `/people?name=${request.query.search}`,
      `/films?title=${request.query.search}`,
      `/starships?name=${request.query.search}&model=${request.query.search}`,
      `/vehicles?name=${request.query.search}&model=${request.query.search}`,
      `/species?name=${request.query.search}`,
      `/planets?name=${request.query.search}`,
    ];

    const responses = await Promise.all(
      swapiRequests.map((swapiRequest: string) => {
        swapi.fetchUrl(swapiRequest);
      })
    );

    return responses;
  },
};
