import Hapi from '@hapi/hapi';
import DataType from '../types/DataType';
import swapi, { SwapiRequest } from '../utils/swapi';

export default {
  async search(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const type: DataType =
      request.params.type &&
      [
        'people',
        'films',
        'starships',
        'vehicles',
        'species',
        'planets',
      ].includes(request.params.type)
        ? request.params.type
        : undefined;

    const id: number | undefined = type ? request.query.id : undefined;

    const swapiRequests: SwapiRequest | SwapiRequest[] = type
      ? {
          dataType: type,
          query: request.query.search
            ? type === 'people' || type === 'species' || type === 'planets'
              ? `?name=${request.query.search}`
              : type === 'starships' || type === 'vehicles'
              ? `?name=${request.query.search}&model=${request.query.search}`
              : type === 'films'
              ? `?title=${request.query.search}`
              : ''
            : '',
          id,
        }
      : [
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

    const response = Array.isArray(swapiRequests)
      ? await Promise.all(
          swapiRequests.map((swapiRequest: SwapiRequest) =>
            swapi.fetchUrl(swapiRequest)
          )
        )
          .then((data) => {
            const mappedResponse: any = {};

            data.forEach((value) => {
              Object.entries(value).forEach((entry) => {
                mappedResponse[entry[0]] = entry[1];
              });
            });

            return mappedResponse;
          })
          .catch((error) => {
            // TODO
          })
      : await swapi
          .fetchUrl(swapiRequests)
          .then((data) => (data[type] ? data[type] : data))
          .catch((error) => {
            // TODO
          });

    return response;
  },
};
