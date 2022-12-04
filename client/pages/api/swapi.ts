import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.statusCode === 400;
    return res.send('Bad request: accept only GET method');
  }

  return await axios('http://localhost:4000/search', {
    params: req.query,
    headers: {
      'Accept-Encoding': 'application/json',
    }
  })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      throw error;
    });
};

export default handler;
