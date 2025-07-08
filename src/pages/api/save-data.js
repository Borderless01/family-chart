import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const filePath = path.join(process.cwd(), 'src', 'data', 'family.json');

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Failed to save file:', err);
        return res.status(500).json({ message: 'Failed to save file' });
      }

      return res.status(200).json({ message: 'File saved successfully' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
