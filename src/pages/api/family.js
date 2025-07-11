import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'data.json');

  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContents);
      res.status(200).json(data);
    } catch (err) {
      console.error('Failed to read family tree:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
      res.status(200).json({ message: 'Family tree saved successfully' });
    } catch (err) {
      console.error('Failed to save family tree:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}