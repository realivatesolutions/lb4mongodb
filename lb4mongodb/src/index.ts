import { PrototypeApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { OpenApiSpec } from '@loopback/rest';
export { PrototypeApplication };

export async function main(options: ApplicationConfig = {}) {

  const spec: OpenApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Black Pearl Loopback v4',
      version: '1.0.2',
    },
    paths: {},
    security: [
      {
        ApiKeyAuth: ['access_token'],
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'access_token',
          in: 'query'
        }
      }
    },
  };

  const app = new PrototypeApplication(options);
  await app.boot();
  await app.start();
  app.api(spec);
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
