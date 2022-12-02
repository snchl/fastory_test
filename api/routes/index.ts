import Hapi from '@hapi/hapi';
import Search from '../repositories/Search';

const routes = [
  {
    path: '/search',
    method: ['GET'],
    handler: Search.search
  },
] as Hapi.ServerRoute<Hapi.ReqRefDefaults>[];

export default routes;
