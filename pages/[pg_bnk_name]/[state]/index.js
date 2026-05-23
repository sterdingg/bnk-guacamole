import Link from 'next/link';
import HeadSeo from "@/comp/HeadSeo";
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../json/bank_name.json';

function StateIndex({ bankName, bankUrlName, stateName, stateUrlName, cities }) {
    return (
        <>
            <HeadSeo headtype={"Bank_State_Page"} bank_name={bankName} bank_state={stateName} />
            <div className="container pt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}`}>{bankName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{stateName}</li>
                    </ol>
                </nav>
                <h1 className="mb-4">Select City in {stateName} for {bankName}</h1>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {cities.map((city) => (
                                <li key={city} className="list-group-item">
                                    <Link href={`/${bankUrlName}/${stateUrlName}/${city.replaceAll(" ", "_")}`} style={{ textDecoration: 'none', display: 'block' }}>
                                        {city}
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

export default StateIndex;

export async function getStaticPaths() {
    const fs = require('fs');
    const path = require('path');
    
    let paths = [];
    
    for (let bank of bankname_db) {
        const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
        try {
            const bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            const states = Array.from(new Set(bankData.map(item => item.STATE)));
            states.forEach(state => {
                paths.push({
                    params: {
                        pg_bnk_name: bank.BANK_NAME.replaceAll(" ", "_"),
                        state: state.replaceAll(" ", "_")
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

    const cities = Array.from(new Set(
        bankData
            .filter(item => item.STATE === state_name)
            .map(item => item.CITY2)
    )).sort();

    if (cities.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            bankName: pg_bnk_name,
            bankUrlName: context.params.pg_bnk_name,
            stateName: state_name,
            stateUrlName: context.params.state,
            cities: cities
        }
    };
}
