import Link from 'next/link';
import HeadSeo from "@/comp/HeadSeo";
import Search_Bank_UI from "@/comp/Search_Bank_UI";
import fs from 'fs';
import path from 'path';
import bankname_db from '../../../../../json/bank_name.json';

function BranchIndex({ bankName, bankUrlName, stateName, stateUrlName, cityName, cityUrlName, branchName, branchUrlName, branchData }) {
    
    const head_data = {
        bnh: branchUrlName,
        c2: cityUrlName,
        s: stateUrlName
    };
    
    const head_url = `https://bankifsccode.qpkendra.com/${bankUrlName}/${stateUrlName}/${cityUrlName}/${branchUrlName}`;

    const breadcrumbs = [
        { name: "Home", url: "https://bankifsccode.qpkendra.com" },
        { name: bankName, url: `https://bankifsccode.qpkendra.com/${bankUrlName}` },
        { name: stateName, url: `https://bankifsccode.qpkendra.com/${bankUrlName}/${stateUrlName}` },
        { name: cityName, url: `https://bankifsccode.qpkendra.com/${bankUrlName}/${stateUrlName}/${cityUrlName}` },
        { name: branchName, url: head_url }
    ];

    return (
        <div className="pt-4">
            <HeadSeo 
                headtype={"search_params"}  
                head_url={head_url} 
                head_data={head_data} 
                bank_name={bankName} 
                len={[branchData]}
                breadcrumbs={breadcrumbs}
            />
            
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}`}>{bankName}</Link></li>
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}/${stateUrlName}`}>{stateName}</Link></li>
                        <li className="breadcrumb-item"><Link href={`/${bankUrlName}/${stateUrlName}/${cityUrlName}`}>{cityName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{branchName}</li>
                    </ol>
                </nav>
            </div>
            
            <Search_Bank_UI data_display={[branchData]} head_url={head_url} />
        </div>
    );
}

export default BranchIndex;

export async function getStaticPaths() {
    const fs = require('fs');
    const path = require('path');
    
    let paths = [];
    
    for (let bank of bankname_db) {
        const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
        try {
            const bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            
            bankData.forEach(item => {
                if(item.STATE && item.CITY2 && item.BRANCH) {
                    paths.push({
                        params: {
                            pg_bnk_name: bank.BANK_NAME.replaceAll(" ", "_"),
                            state: item.STATE.replaceAll(" ", "_"),
                            city: item.CITY2.replaceAll(" ", "_"),
                            branch: item.BRANCH.replaceAll(" ", "_")
                        }
                    });
                }
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
    const branch_name = context.params.branch.replaceAll("_", " ");
    
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

    const branchData = bankData.find(item => 
        item.STATE === state_name && 
        item.CITY2 === city_name &&
        item.BRANCH === branch_name
    );

    if (!branchData) {
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
            branchName: branch_name,
            branchUrlName: context.params.branch,
            branchData: branchData
        }
    };
}
