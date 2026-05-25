const fs = require('fs');
const path = require('path');
const bankname_db = require('../json/bank_name.json');

const sitemapPath = path.join(__dirname, '../public/sitemap_index.xml');
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const baseUrl = 'https://bankifsccode.qpkendra.com';

// Add homepage
xml += `  <url><loc>${baseUrl}</loc><changefreq>daily</changefreq></url>\n`;
xml += `  <url><loc>${baseUrl}/v4</loc><changefreq>daily</changefreq></url>\n`;

console.log("Generating clean sitemap for Option A...");

for (let bank of bankname_db) {
    const bankUrl = `${baseUrl}/${bank.BANK_NAME.replaceAll(" ", "_")}`;
    xml += `  <url><loc>${bankUrl}</loc><changefreq>weekly</changefreq></url>\n`;

    const jsonPath = path.join(__dirname, '../json', `${bank.bank_id}.json`);
    try {
        const bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Track unique states and cities
        const states = new Set();
        const cities = new Set();

        bankData.forEach(item => {
            if (item.STATE) states.add(item.STATE.replaceAll(" ", "_"));
            if (item.STATE && item.CITY2) {
                cities.add(`${item.STATE.replaceAll(" ", "_")}/${item.CITY2.replaceAll(" ", "_")}`);
            }
        });

        // Add state pages
        states.forEach(state => {
            xml += `  <url><loc>${bankUrl}/${state}</loc><changefreq>weekly</changefreq></url>\n`;
        });

        // Add city pages (which now contain all branch data)
        cities.forEach(cityPath => {
            xml += `  <url><loc>${bankUrl}/${cityPath}</loc><changefreq>weekly</changefreq></url>\n`;
        });

    } catch(e) {
        console.error(`Could not read ${bank.bank_id}.json`);
    }
}

xml += `</urlset>`;

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log("Sitemap successfully generated at public/sitemap_index.xml");
