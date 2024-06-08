import { createServerSideHelpers } from '@trpc/react-query/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { env } from '~/env';
import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';
import { db } from '~/server/db';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
        }
      : undefined,
});

export const trpcHelper = createServerSideHelpers({
  router: appRouter,
  ctx: { db },
  transformer: superjson,
});
