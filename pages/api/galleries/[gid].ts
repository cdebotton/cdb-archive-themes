import { NextApiRequest, NextApiResponse } from 'next';

import { galleries } from '../data.json';

export default function(req: NextApiRequest, res: NextApiResponse) {
  const uri = req.query.gid;
  const gallery = galleries.find(g => g.uri === uri);

  if (!gallery) {
    res.status(404);
    res.end('Not found');
  }

  res.status(200);
  res.end(JSON.stringify(gallery));
}
