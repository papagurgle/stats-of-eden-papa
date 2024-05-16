import { db } from '~/server/db';
import { updateDB } from '~/server/update-db';

updateDB()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void (async () => {
      await db.$disconnect();
    })();
  });
