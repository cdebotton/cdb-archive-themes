import { NextApiRequest, NextApiResponse } from 'next';

import { galleries } from '../data.json';

export default function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.status(200);
  res.end(JSON.stringify(galleries));
}
