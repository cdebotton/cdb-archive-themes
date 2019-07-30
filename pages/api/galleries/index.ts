import { NextApiRequest, NextApiResponse } from 'next';

import { galleries } from '../data.json';

export default function(req: NextApiRequest, res: NextApiResponse) {
  res.status(200);
  res.end(JSON.stringify(galleries));
}
