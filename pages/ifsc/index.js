import { useRouter } from "next/router";
import bnk_data from '../../json/bank_name_1.json';
import { useState } from "react";
import HeadSeo from "@/comp/HeadSeo";
import Search_Bank_UI from "@/comp/Search_Bank_UI";
import Search_ifsc from "@/comp/Search_ifsc";

function index() {
    let routdata = useRouter();
    var [bank_db_filtered, setbank_db_filtered] = useState([]);
    if (routdata?.query?.i && routdata?.query?.i!==undefined && routdata?.query?.i?.length === 11) {
        bnk_data.map(async (item) => {
            if (item.IFSC.slice(0, 4).toLowerCase() === routdata?.query?.i.slice(0, 4).toLowerCase()) {
                const nda = (await import(`../../json/${item.bank_id}.json`)).default;
                nda !== undefined && nda !== null ? (nda.map((item) => {
                    if (item.IFSC.toLowerCase() === routdata?.query?.i.toLowerCase()) {
                        setbank_db_filtered(item)
                    }
                })
                    // setbank_db_filtered(nda)
                ) : "";

            }
        })
    }
    let head_data = {
        bnh: bank_db_filtered?.BRANCH?.replaceAll(" ", "_"),
        c2: bank_db_filtered?.CITY2?.replaceAll(" ", "_"),
        s: bank_db_filtered?.STATE?.replaceAll(" ", "_")
    }
    
    return (
        <>
            {(routdata?.query?.i!==undefined) && (bank_db_filtered?.STATE!==undefined) &&  (head_data.bnh!==undefined) && (routdata?.query?.i?.length === 11)? <div className="pt-4">
                <HeadSeo headtype={"ifsc_search_params"} head_url={routdata?.asPath} head_data={head_data} bank_name={bank_db_filtered?.BANK?.replaceAll("_", " ")} len={[bank_db_filtered]} />
                <Search_Bank_UI data_display={[bank_db_filtered]} head_url={routdata?.asPath} breadcrumb_ifsc={routdata?.asPath} is_ifsc_aspath={true} />
            </div> : 
            <>
            <HeadSeo/>
            <Search_ifsc bnk_data={bnk_data}/>
            </>

            }

        </>
    );
}

export default index;