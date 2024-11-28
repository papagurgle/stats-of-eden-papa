import { updateDB } from '~/server/update-db';
import { db } from '~/server/db';

(async function main() {
  try {
    console.log('Starting manual updateDB...');
    await updateDB();
    console.log('updateDB completed.');
  } catch (error) {
    console.error('Error running updateDB:', error);
    process.exit(1); // Exit with error code
  } finally {
    await db.$disconnect();
    console.log('Disconnected from database.');
    process.exit(0); // Exit successfully
  }
})();
