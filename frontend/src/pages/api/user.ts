import type { NextApiRequest, NextApiResponse } from 'next';

let users: { id: number; name: string; email: string }[] = []; // In-memory "database"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Handle GET request: Return the list of users
      res.status(200).json(users);
      break;

    case 'POST':
      // Handle POST request: Add a new user to the list
      const { id, name, email } = req.body;
      if (!id || !name || !email) {
        res.status(400).json({ message: 'Missing required fields' });
        break;
      }
      const newUser = { id, name, email };
      users.push(newUser);
      res.status(201).json(newUser);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
