import Link from 'next/link';
import HeadSeo from "@/comp/HeadSeo";
import fs from 'fs';
import path from 'path';
import bankname_db from '../../json/bank_name.json';

function BankIndex({ bankName, bankUrlName, states }) {
    const head_url = `https://bankifsccode.qpkendra.com/${bankUrlName}`;
    const breadcrumbs = [
        { name: "Home", url: "https://bankifsccode.qpkendra.com" },
        { name: bankName, url: head_url }
    ];

    return (
        <>
            <HeadSeo 
                headtype={"Bank_Name_Page"} 
                bank_name={bankName} 
                head_url={head_url}
                breadcrumbs={breadcrumbs}
            />
            <div className="container pt-4">
                <h1 className="mb-4">Select State for {bankName}</h1>
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {states.map((state) => (
                                <li key={state} className="list-group-item">
                                    <Link href={`/${bankUrlName}/${state.replaceAll(" ", "_")}`} style={{ textDecoration: 'none', display: 'block' }}>
                                        {state}
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

export default BankIndex;

export async function getStaticPaths() {
    let paths = bankname_db.map((post) => {
        return {
            params: {
                pg_bnk_name: post.BANK_NAME.replaceAll(" ", "_"),
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const pg_bnk_name = context.params.pg_bnk_name.replaceAll("_", " ");
    const bank = bankname_db.find((b) => b.BANK_NAME === pg_bnk_name);

    if (!bank) {
        return { notFound: true };
    }

    const jsonPath = path.join(process.cwd(), 'json', `${bank.bank_id}.json`);
    let bankData = [];
    try {
        bankData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
        console.error(`Could not load JSON for ${bank.bank_id}`);
    }

    const states = Array.from(new Set(bankData.map((item) => item.STATE))).sort();

    return {
        props: {
            bankName: pg_bnk_name,
            bankUrlName: context.params.pg_bnk_name,
            states: states
        }
    };
}