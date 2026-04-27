import type { FastifyInstance } from 'fastify';
import * as schema from '../db/schema/schema.js';
import type { App } from '../index.js';

export function register(app: App, fastify: FastifyInstance) {
  fastify.get('/api/greeting', {
    schema: {
      description: 'Get the first greeting message',
      tags: ['greeting'],
      response: {
        200: {
          description: 'Greeting message retrieved successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            message: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        404: {
          description: 'No greeting found',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    app.logger.info('Fetching greeting message');
    try {
      const greeting = await app.db.query.greetings.findFirst();
      if (!greeting) {
        app.logger.warn('No greeting found');
        return reply.status(404).send({ error: 'No greeting found' });
      }
      app.logger.info({ greetingId: greeting.id }, 'Greeting retrieved successfully');
      return greeting;
    } catch (error) {
      app.logger.error({ err: error }, 'Failed to fetch greeting');
      throw error;
    }
  });
}
