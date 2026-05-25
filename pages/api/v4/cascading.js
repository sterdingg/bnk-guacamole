import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { bank_id, state, city } = req.query;

  if (!bank_id) {
    return res.status(400).json({ error: "bank_id is required" });
  }

  const jsonDir = path.join(process.cwd(), 'json');
  // Prevent path traversal
  const sanitizedId = parseInt(bank_id, 10);
  if (isNaN(sanitizedId)) {
    return res.status(400).json({ error: "Invalid bank_id" });
  }
  const filePath = path.join(jsonDir, `${sanitizedId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Bank data not found" });
  }

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const branches = JSON.parse(fileData);

    if (state && city) {
      // Return branches for given state and city (CITY1)
      const filtered = branches.filter(b =>
        b.STATE === state &&
        b.CITY1 === city &&
        b.BRANCH
      );
      return res.status(200).json({ branches: filtered });
    } else if (state) {
      // Return cities for given state (using CITY1 field)
      const cities = Array.from(new Set(
        branches.filter(b => b.STATE === state && b.CITY1).map(b => b.CITY1)
      )).sort();
      return res.status(200).json({ cities });
    } else {
      // Return states for bank
      const states = Array.from(new Set(
        branches.filter(b => b.STATE).map(b => b.STATE)
      )).sort();
      return res.status(200).json({ states });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
