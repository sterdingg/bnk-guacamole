import { useState } from "react";
import { useRouter } from 'next/router';
import bankname_db from '../../json/bank_name'

function index() {
    var [bank_db_filtered, setbank_db_filtered] = useState([]);
    var for_state_set = [];
    let routerdata = useRouter();
    
    var count = 0;
    if (routerdata.query.pg_bnk_name && routerdata.query.pg_bnk_name !== undefined && count == 0) {
        bankname_db.map(async (item) => {
            if (item.BANK_NAME === routerdata.query.pg_bnk_name.replaceAll("_", " ")) {
                const nda = (await import(`../../json/${item.bank_id}.json`)).default;
                nda !== undefined && nda !== null ? setbank_db_filtered(nda) : "";
            }
        })
        
        count = count + 1;
    }
    // for state set 
    if (count == 1) {
        bank_db_filtered !== undefined && bank_db_filtered.map((item) => {
            for_state_set.push(item.STATE)
        })
        for_state_set = Array.from(new Set(for_state_set));
        for_state_set.sort();
        count = count + 1;
    }
    function handleChange(e, name) {
        if (name == "bankstate") {
            if (e.target.value === "Select Bank State") {
                //   setbdk_nme();

            } else {
                //   setbdk_nme(e.target.value.replaceAll(" ","_"));
                routerdata.push(`${routerdata.asPath}/${e.target.value.replaceAll(" ", "_")}`)
            }
        }
    }
    return (
        <>
            <form className="container pt-3">
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="input_bankname">Select Bank State</label>
                        <div>
                            <select name="input_bankname" id="Bank Name" className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e, "bankstate") }}>
                                <option defaultValue="selected">Select Bank State</option>
                                {for_state_set.map((item) => {
                                    return (
                                        <option key={item} value={item.replaceAll(" ", "_")} style={{ overflowY: "auto", maxHeight: "238px", maxWidth: "50%" }}>
                                            {" "}{item.replaceAll("_", " ")}{" "}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default index;


// export async function getStaticPaths() {
//     let dd = bankname_db.map((post) => {
//         return {
//             params: {
//                 pg_bnk_name: `${post.BANK_NAME.replaceAll(" ", "_")}`,
//             }
//         };
//     })
//     return {
//         paths: dd,
//         fallback: false,
//     };

// }

// export async function getStaticProps(context) {
//     return {
//         // Passed to the page component as props
//         props: {}
//     }
// }