import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'src', 'data', 'data.json');
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
      if (err) {
        console.error('Failed to write file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Family tree saved successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}