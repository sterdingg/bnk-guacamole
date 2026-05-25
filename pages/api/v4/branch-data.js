import fs from 'fs';
import path from 'path';
import bankname_db from '../../../json/bank_name.json';

export default function handler(req, res) {
  const { bank, branch } = req.query;
  if (!bank || !branch) return res.status(400).json({ error: 'Bank and branch required' });
  
  const bankSearch = bank.replaceAll("-", " ").toLowerCase();
  const bankRecord = bankname_db.find(b => b.BANK_NAME.toLowerCase() === bankSearch);
  
  if (!bankRecord) return res.status(404).json({ error: 'Bank not found' });

  const jsonPath = path.join(process.cwd(), 'json', `${bankRecord.bank_id}.json`);
  let bankData = [];
  try {
    bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch(e) {
    return res.status(500).json({ error: 'Data not found' });
  }

  const branchSearch = branch.replaceAll("-", " ").toLowerCase();
  const branchDetails = bankData.find(item => item.BRANCH.toLowerCase() === branchSearch);
  
  let nearby = [];
  if (branchDetails) {
     nearby = bankData.filter(item => item.CITY1 === branchDetails.CITY1 && item.IFSC !== branchDetails.IFSC).slice(0, 4);
  }

  return res.status(200).json({ details: branchDetails, nearby });
}
