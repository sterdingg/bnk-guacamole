import { useState } from "react";
import { useRouter } from 'next/router';
import bankname_db from '../../../../../json/bank_name'
import Bnk_details from "@/comp/Bnk_details";
import HeadSeo from "@/comp/HeadSeo";
import Breadcumb from "@/comp/Breadcumb";
import Sidebar from "@/comp/sidebar";

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
    if (count == 1) {
        bank_db_filtered !== undefined && bank_db_filtered.map((item) => {
            if (item.BRANCH === routerdata.query.pg_bnk_branch.replaceAll("_", " ")) {
                for_state_set.push(item)
            }
        })
        count = count + 1;
    }
    // console.log(routerdata)
    // console.log(for_state_set)


    return (
        <div className="pt-4 ">
            <HeadSeo headtype="Bank_Branch_Page" router_data={routerdata?.query} ifsc_code={for_state_set[0]?.IFSC} />
            <Breadcumb data={for_state_set} />
            <main id="main">
                <section id="blog" className="blog">
                    <div className="container ">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <Bnk_details data_display={for_state_set} />
                            </div>
                            {/* sidebar starts */}
                            <Sidebar/>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
}

export default index;