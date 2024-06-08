import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/env';

export type SiteState = {
  lastUpdated: Date;
  updating: boolean;
};

interface SiteStateNextApiRequest extends NextApiRequest {
  body: {
    lastUpdated?: boolean;
    updating?: boolean;
    customId: string;
  };
}

export const siteState = {
  lastUpdated: new Date(),
  updating: false,
};

export default function handler(req: SiteStateNextApiRequest, res: NextApiResponse<SiteState>) {
  if (req.method === 'GET') {
    return res.status(200).json(siteState);
  }

  if (req.method === 'POST') {
    let body: SiteStateNextApiRequest['body'];

    if (typeof req.body === 'string') {
      body = JSON.parse(req.body) as SiteStateNextApiRequest['body'];
    } else {
      body = req.body;
    }

    if (body.customId === env.CUSTOMID) {
      if (body.lastUpdated === true) {
        siteState.lastUpdated = new Date();
      }

      if (body.updating !== undefined) {
        siteState.updating = body.updating;
      }

      return res.status(200).json(siteState);
    } else {
      return void res.status(401).end();
    }
  }

  return res.status(400).end();
}
