import Hapi from '@hapi/hapi';
import swapi, { SwapiRequest } from '../utils/swapi';

export default {
  async search(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    if (!request.query.search) {
      return h
        .response('Missing search query params')
        .code(400)
        .message('Bad request');
    }

    const swapiRequests: SwapiRequest[] = [
      {
        dataType: 'people',
        query: `?name=${request.query.search}`,
      },
      {
        dataType: 'films',
        query: `?title=${request.query.search}`,
      },
      {
        dataType: 'starships',
        query: `?name=${request.query.search}&model=${request.query.search}`,
      },
      {
        dataType: 'vehicles',
        query: `?name=${request.query.search}&model=${request.query.search}`,
      },
      {
        dataType: 'species',
        query: `?name=${request.query.search}`,
      },
      {
        dataType: 'planets',
        query: `?name=${request.query.search}`,
      },
    ];

    const responses = await Promise.all(
      swapiRequests.map((swapiRequest: SwapiRequest) =>
        swapi.fetchUrl(swapiRequest)
      )
    ).then((data) => {
      const mappedResponse: any = {};

      data.forEach((value) => {
        Object.entries(value).forEach((entry) => {
          mappedResponse[entry[0]] = entry[1];
        });
      });

      return mappedResponse;
    });

    return responses;
  },
};
