import HeadSeo from '@/comp/HeadSeo';
import { useRouter } from 'next/router';
import { useState } from "react";
import bankname_db from '../../../json/bank_name'

function index() {
    let routerdata = useRouter();
    var [bank_db_filtered, setbank_db_filtered] = useState([]);
    var count = 0;

    if (routerdata.query?.bank_sitemap && routerdata.query.bank_sitemap !== undefined && count == 0) {
        bankname_db.map(async (item) => {
            if (item.BANK_NAME === routerdata.query.bank_sitemap.replaceAll("_", " ")) {
                const nda = (await import(`../../../json/${item.bank_id}.json`)).default;
                nda !== undefined && nda !== null ? setbank_db_filtered(nda) : "";
            }
        })
        
        count = count + 1;
    }
    return (
        <>
        <HeadSeo headtype={"Bank_Name_Page"} bank_name={routerdata?.query?.bank_sitemap}/>
        <div className='container pt-4 pb-4'>
            {bank_db_filtered && bank_db_filtered.map((item)=>{
                return  <p><a href={`/${item.BANK.replaceAll(" ","_")}?s=${item.STATE.replaceAll(" ","_")}&c2=${item.CITY2.replaceAll(" ","_")}&bnh=${item.BRANCH.replaceAll(" ","_")}`} prefetch={false} >{`${item.STATE}---> ${item.CITY2}--->${item.BRANCH}`}</a></p>
            })}
        </div>
        </>
    );
}

export default index;


export async function getStaticPaths() {
    let dd = bankname_db.map((post) => {
        return {
            params: {
                bank_sitemap: `${post.BANK_NAME.replaceAll(" ", "_")}`,
            }
        };
    })
    return {
        paths: dd,
        fallback: false,
    };

}

export async function getStaticProps(context) {
    return {
        // Passed to the page component as props
        props: {}
    }
}