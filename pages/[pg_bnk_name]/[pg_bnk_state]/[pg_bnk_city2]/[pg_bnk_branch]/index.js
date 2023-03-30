import { useState } from "react";
import { useRouter } from 'next/router';
import bankname_db from '../../../../../json/bank_name'
import Bnk_details from "@/comp/Bnk_details";
import HeadSeo from "@/comp/HeadSeo";

function index() {
    var [bank_db_filtered, setbank_db_filtered] = useState([]);
    var for_state_set = [];
    let routerdata = useRouter();
    var count = 0;
    
    if (routerdata.query.pg_bnk_name && routerdata.query.pg_bnk_name !== undefined && count == 0) {
        bankname_db.map(async (item) => {
            if (item.BANK_NAME === routerdata.query.pg_bnk_name.replaceAll("_", " ")) {
                const nda = (await import(`../../../../../json/${item.bank_id}.json`)).default;
                nda !== undefined && nda !== null ? setbank_db_filtered(nda) : "";
            }
        })


        count = count + 1;
    }
    // for state set 
    if(count==1){
        bank_db_filtered !== undefined && bank_db_filtered.map((item) => {
        if(item.BRANCH===routerdata.query.pg_bnk_branch.replaceAll("_", " ")){
            for_state_set.push(item)
        }
    })
    count = count + 1;
}
    return (
        <>
        <HeadSeo headtype="Bank_Branch_Page" router_data={routerdata?.query} ifsc_code={for_state_set[0]?.IFSC}/>
        <div className="container pt-4 pb-4 ">
        <Bnk_details data_display={for_state_set}/>
        </div>
          
        </>
    );
}

export default index;