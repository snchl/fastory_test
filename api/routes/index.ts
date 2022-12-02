import Hapi from '@hapi/hapi';
import Swapi from '../repositories/Swapi';

const routes = [
  {
    path: '/search/{type?}',
    method: ['GET'],
    handler: Swapi.search
  },
] as Hapi.ServerRoute<Hapi.ReqRefDefaults>[];

export default routes;
