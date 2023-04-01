import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import bankname_db from '../../json/bank_name'
import queryobject from 'query-object'
import HeadSeo from "@/comp/HeadSeo";
import Search_Bank_UI from "@/comp/Search_Bank_UI";


function index() {
    var [window_params, setwindow_params] = useState([]);

    useEffect(() => {
        // console.log(window.location.hostname)
        // console.log(window.location.href)
        let data={
            querypath:queryobject.parse(window.location.search),
            url_href:window.location.href
        }
        // console.log(data)
        setwindow_params(data)

    }, [])

    var [bank_db_filtered, setbank_db_filtered] = useState([]);
    var for_state_set = [];
    let routerdata = useRouter();
    let search_data = [];
    var count = 0;
    // console.log(routerdata.asPath.replace("/","").replaceAll("_"," "))
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

    if (window_params.querypath && window_params.querypath.s !== undefined && routerdata.query.s !== undefined && routerdata.query.c2 !== undefined && routerdata.query.bnh !== undefined) {
        let state = routerdata.query.s.replaceAll("_", " ");
        let city2 = routerdata.query.c2.replaceAll("_", " ");
        let branch = routerdata.query.bnh.replaceAll("_", " ");
        bank_db_filtered != undefined && bank_db_filtered.map((item) => {
            if (item.STATE === state && item.CITY2 === city2 && item.BRANCH === branch) {
                search_data.push(item)
            }
        })
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
    
            {/* && routerdata.query.s!==undefined && search_data!==undefined && search_data.length>0 && search_data  */}
            {window_params.querypath && window_params.querypath.s !== undefined ?
            
                search_data !== undefined && search_data.length > 0 && search_data ?<div className="pt-4">
                    <HeadSeo headtype={"search_params"}  head_url={window_params.url_href} head_data={window_params.querypath} bank_name={window.location.pathname.replace("/","").replaceAll("_"," ")} len={search_data}/>                    
                    <Search_Bank_UI data_display={search_data} head_url={window_params.url_href} />
                    
                </div>: ""
                :

                <form className="container pt-3">
                    <HeadSeo headtype={"Bank_Name_Page"} head_url={window_params.url_href} bank_name={routerdata.asPath.replace("/","").replaceAll("_"," ")}/>
                    <div className="form-row">
                    <p>Bank Name : {routerdata?.query?.pg_bnk_name!==undefined?routerdata?.query?.pg_bnk_name.replaceAll("_", " "):""} </p>
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
                }

        </>
    );
}

export default index;


export async function getStaticPaths() {
    let dd = bankname_db.map((post) => {
        return {
            params: {
                pg_bnk_name: `${post.BANK_NAME.replaceAll(" ", "_")}`,
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