import { useState } from "react";
import { useRouter } from 'next/router';
import bankname_db from '../../../../../json/bank_name'

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
           {for_state_set && for_state_set && <div className='container center'>
          {
            for_state_set.map((item) =>
              <div key={item.data_bk_id} className='container'>
                {item.BANK}
                <br></br>
                {item.ADDRESS}
                <br></br>
                {item.BRANCH}
                <br></br>
                {item.CITY1}
                <br></br>
                {item.CITY2}
                <br></br>
                {item.IFSC}
                <br></br>
                {item.PHONE}
                <br></br>
                {item.STATE}
                <br></br>
                {item.STD_CODE}
                <br></br>

              </div>
            )
          }

        </div>

        }
        </>
    );
}

export default index;