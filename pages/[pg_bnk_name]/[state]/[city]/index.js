import Link from 'next/link';
import HeadSeo from "@/comp/HeadSeo";
import Search_Bank_UI from "@/comp/Search_Bank_UI";
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../../json/bank_name.json';

function CityIndex({ bankName, bankUrlName, stateName, stateUrlName, cityName, cityUrlName, branchesData }) {
    const head_url = `https://bankifsccode.qpkendra.com/${bankUrlName}/${stateUrlName}/${cityUrlName}`;
    const breadcrumbs = [
        { name: "Home", url: "https://bankifsccode.qpkendra.com" },
        { name: bankName, url: `https://bankifsccode.qpkendra.com/${bankUrlName}` },
        { name: stateName, url: `https://bankifsccode.qpkendra.com/${bankUrlName}/${stateUrlName}` },
        { name: cityName, url: head_url }
    ];

    return (
        <>
            <HeadSeo 
                headtype={"search_params"} 
                head_data={{
                    bnh: "All Branches",
                    c2: cityUrlName,
                    s: stateUrlName
                }}
                bank_name={bankName}
                len={branchesData}
                head_url={head_url}
                breadcrumbs={breadcrumbs}
            />
            <div className="container pt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}`}>{bankName}</Link></li>
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}/${stateUrlName}`}>{stateName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{cityName}</li>
                    </ol>
                </nav>
                <h1 className="mb-4">All Branches in {cityName}, {stateName} for {bankName}</h1>
            </div>
            <Search_Bank_UI data_display={branchesData} head_url={head_url} />
        </>
    );
}

export default CityIndex;

export async function getStaticPaths() {
    const fs = require('fs');
    const path = require('path');
    
    let paths = [];
    
    for (let bank of bankname_db) {
        const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
        try {
            const bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            
            // Get unique state + city combinations
            const stateCitySet = new Set();
            bankData.forEach(item => {
                if(item.STATE && item.CITY2) {
                    stateCitySet.add(`${item.STATE}|${item.CITY2}`);
                }
            });
            
            Array.from(stateCitySet).forEach(combo => {
                const [state, city] = combo.split('|');
                paths.push({
                    params: {
                        pg_bnk_name: bank.BANK_NAME.replaceAll(" ", "_"),
                        state: state.replaceAll(" ", "_"),
                        city: city.replaceAll(" ", "_")
                    }
                });
            });
        } catch(e) {
            console.error(`Could not read ${bank.bank_id}.json`);
        }
    }
    
    return {
        paths,
        fallback: false,
    };
}

// In-memory cache to prevent parsing large JSON files multiple times during the build process
const bankJsonCache = {};

export async function getStaticProps(context) {
    const pg_bnk_name = context.params.pg_bnk_name.replaceAll("_", " ");
    const state_name = context.params.state.replaceAll("_", " ");
    const city_name = context.params.city.replaceAll("_", " ");
    
    const bank = bankname_db.find((b) => b.BANK_NAME === pg_bnk_name);

    if (!bank) {
        return { notFound: true };
    }

    let bankData = [];
    try {
        if (bankJsonCache[bank.bank_id]) {
            bankData = bankJsonCache[bank.bank_id];
        } else {
            const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
            bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            bankJsonCache[bank.bank_id] = bankData;
        }
    } catch (e) {
        return { notFound: true };
    }

    const branchesData = bankData.filter(item => 
        item.STATE === state_name && item.CITY2 === city_name
    ).sort((a, b) => a.BRANCH.localeCompare(b.BRANCH));

    if (branchesData.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            bankName: pg_bnk_name,
            bankUrlName: context.params.pg_bnk_name,
            stateName: state_name,
            stateUrlName: context.params.state,
            cityName: city_name,
            cityUrlName: context.params.city,
            branchesData: branchesData
        }
    };
}
