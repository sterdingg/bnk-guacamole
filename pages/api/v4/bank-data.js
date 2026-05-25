import fs from 'fs';
import path from 'path';
import bankname_db from '../../../json/bank_name.json';

export default function handler(req, res) {
  const { bank, state, city } = req.query;
  if (!bank) return res.status(400).json({ error: 'Bank required' });
  
  const bankSearch = bank.toLowerCase();
  const bankRecord = bankname_db.find(b => b.BANK_NAME.replaceAll(" ", "-").toLowerCase() === bankSearch);
  
  if (!bankRecord) return res.status(404).json({ error: 'Bank not found' });

  const jsonPath = path.join(process.cwd(), 'json', `${bankRecord.bank_id}.json`);
  let bankData = [];
  try {
    bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch(e) {
    return res.status(500).json({ error: 'Data not found' });
  }

  if (city && state) {
    const branches = bankData.filter(item => item.STATE === state && item.CITY1 === city);
    return res.status(200).json({ branches });
  } else if (state) {
    const cities = Array.from(new Set(bankData.filter(item => item.STATE === state).map(item => item.CITY1))).sort();
    return res.status(200).json({ cities });
  } else {
    const states = Array.from(new Set(bankData.map(item => item.STATE))).sort();
    return res.status(200).json({ states });
  }
}
