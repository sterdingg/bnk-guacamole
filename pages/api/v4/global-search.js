import bankname_db from '../../../json/bank_name';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { q } = req.query;
  
  if (!q || q.length < 3) {
    return res.status(200).json({ banks: [], branches: [] });
  }

  const query = q.toLowerCase();
  
  // Search Banks
  const matchedBanks = bankname_db.filter(bank => 
    bank.BANK_NAME.toLowerCase().includes(query)
  ).slice(0, 5);

  // Search Branches (Limit to first 10 matches to be fast)
  let matchedBranches = [];
  const jsonDir = path.join(process.cwd(), 'json');
  
  try {
    // Only search the first 50 most popular banks to save time, or all if needed.
    // For now, let's just search all of them until we find 10 matches.
    for (let i = 1; i <= bankname_db.length; i++) {
      if (matchedBranches.length >= 10) break;
      
      const filePath = path.join(jsonDir, `${i}.json`);
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const branches = JSON.parse(fileData);
        
        for (const branch of branches) {
          if (
            branch.BRANCH.toLowerCase().includes(query) || 
            branch.IFSC.toLowerCase().includes(query)
          ) {
            matchedBranches.push({
              BANK: branch.BANK,
              BRANCH: branch.BRANCH,
              IFSC: branch.IFSC,
              STATE: branch.STATE
            });
            if (matchedBranches.length >= 10) break;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error searching branches:", error);
  }

  res.status(200).json({ banks: matchedBanks, branches: matchedBranches });
}
