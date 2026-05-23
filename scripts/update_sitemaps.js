const fs = require('fs');
const path = require('path');

const xmlDir = path.join(__dirname, '../public/xml');

fs.readdir(xmlDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (file.endsWith('.xml')) {
            const filePath = path.join(xmlDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Find all <loc>...</loc> tags
            const locRegex = /<loc>(.*?)<\/loc>/g;
            
            content = content.replace(locRegex, (match, url) => {
                // Check if it matches the old format
                // Example: https://bankifsccode.qpkendra.com/BANK_NAME?s=STATE&c2=CITY&bnh=BRANCH
                // Note: it might be &amp; or &
                const qIndex = url.indexOf('?s=');
                if (qIndex !== -1) {
                    const baseUrl = url.substring(0, qIndex); // https://bankifsccode.qpkendra.com/BANK_NAME
                    const query = url.substring(qIndex); // ?s=STATE&c2=CITY&bnh=BRANCH
                    
                    // We need to split by &c2= (or &amp;c2=) and &bnh= (or &amp;bnh=)
                    let state = "", city = "", branch = "";
                    
                    // Regex to extract state, city, branch safely handling ampersands inside the values
                    // Use match with non-greedy
                    const paramsMatch = query.match(/\?s=(.*?)(?:&amp;|&)c2=(.*?)(?:&amp;|&)bnh=(.*)$/);
                    
                    if (paramsMatch) {
                        state = paramsMatch[1];
                        city = paramsMatch[2];
                        branch = paramsMatch[3];
                        
                        // Construct the new URL string
                        let newUrl = `${baseUrl}/${state}/${city}/${branch}`;
                        
                        // XML requires ampersands to be escaped
                        // Because the old URL might have already had &amp; or just bare &,
                        // let's unescape everything first, then escape it properly for XML.
                        newUrl = newUrl.replace(/&amp;/g, '&').replace(/&/g, '&amp;');
                        
                        return `<loc>${newUrl}</loc>`;
                    }
                }
                
                // If it's already in the new format but has an unescaped &, escape it for XML
                let safeUrl = url.replace(/&amp;/g, '&').replace(/&/g, '&amp;');
                return `<loc>${safeUrl}</loc>`;
            });

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
});
