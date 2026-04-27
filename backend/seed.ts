import { createApplication } from "@specific-dev/framework";
import * as schema from './src/db/schema/schema.js';

const app = await createApplication(schema);

try {
  app.logger.info('Starting seed...');

  // Check if greeting already exists
  const existing = await app.db.query.greetings.findFirst();
  if (existing) {
    app.logger.info('Greeting already exists, skipping seed');
  } else {
    const result = await app.db.insert(schema.greetings).values({
      message: 'Welcome to Qasim!',
    }).returning();
    app.logger.info({ greetingId: result[0].id }, 'Greeting seeded successfully');
  }

  process.exit(0);
} catch (error) {
  app.logger.error({ err: error }, 'Seed failed');
  process.exit(1);
}
