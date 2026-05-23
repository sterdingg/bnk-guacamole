import Link from 'next/link';
import HeadSeo from "@/comp/HeadSeo";
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../../json/bank_name.json';

function CityIndex({ bankName, bankUrlName, stateName, stateUrlName, cityName, cityUrlName, branches }) {
    return (
        <>
            <HeadSeo 
                headtype={"Bank_City_Page"} 
                router_data={{
                    pg_bnk_name: bankUrlName,
                    pg_bnk_state: stateUrlName,
                    pg_bnk_city2: cityUrlName
                }} 
            />
            <div className="container pt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}`}>{bankName}</Link></li>
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}/${stateUrlName}`}>{stateName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{cityName}</li>
                    </ol>
                </nav>
                <h1 className="mb-4">Select Branch in {cityName}, {stateName} for {bankName}</h1>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {branches.map((branch) => (
                                <li key={branch} className="list-group-item">
                                    <Link href={`/${bankUrlName}/${stateUrlName}/${cityUrlName}/${branch.replaceAll(" ", "_")}`} style={{ textDecoration: 'none', display: 'block' }}>
                                        {branch}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
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

export async function getStaticProps(context) {
    const pg_bnk_name = context.params.pg_bnk_name.replaceAll("_", " ");
    const state_name = context.params.state.replaceAll("_", " ");
    const city_name = context.params.city.replaceAll("_", " ");
    
    const bank = bankname_db.find((b) => b.BANK_NAME === pg_bnk_name);

    if (!bank) {
        return { notFound: true };
    }

    const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
    let bankData = [];
    try {
        bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
        return { notFound: true };
    }

    const branches = Array.from(new Set(
        bankData
            .filter(item => item.STATE === state_name && item.CITY2 === city_name)
            .map(item => item.BRANCH)
    )).sort();

    if (branches.length === 0) {
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
            branches: branches
        }
    };
}
