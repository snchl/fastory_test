'use strict';

import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';
import routes from './routes';

export const init = async (): Promise<void> => {
  const server: Server = Hapi.server({
    port: process.env.PORT || 4000,
    host: '0.0.0.0',
  });

  server.route(routes);

  await server.start();
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
