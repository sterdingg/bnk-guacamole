import bankname_db from '../json/bank_name'
import { useState } from "react";
import Bnk_details from '@/comp/Bnk_details';
import HeadSeo from '@/comp/HeadSeo';
import { FcLibrary,FcNext } from "react-icons/fc";


export default function index() {
  const [bdk_nme, setbdk_nme] = useState();
  const [bdk_state, setbdk_state] = useState();
  const [bdk_st_city, setbdk_st_city] = useState();
  const [bdk_st_branch, setbdk_st_branch] = useState();
  var [bank_db_filtered, setbank_db_filtered] = useState([]);

  function handleChange(e, name) {
    if (name == "bankname") {
      if (e.target.value === "Select Bank Name") {
        setbdk_nme();
        setbdk_state();
        setbdk_st_city();
        setbdk_st_branch();
        setbank_db_filtered();
      } else {
        setbdk_state();
        setbdk_st_city();
        setbdk_st_branch();
        setbank_db_filtered();
        setbdk_nme(e.target.value);
        bankname_db.map(async (item) => {
          if (item.BANK_NAME === e.target.value.replaceAll("_", " ")) {
            const nda = (await import(`../json/${item.bank_id}.json`)).default;
            setbank_db_filtered(nda)

          }
        })

      }
    }
    // next if
    if (name == "bankstate") {
      if (e.target.value === "Select Bank State") {
        setbdk_state();
        setbdk_st_city();
        setbdk_st_branch();
      } else {
        setbdk_st_city();
        setbdk_st_branch();
        setbdk_state(e.target.value.replaceAll("_", " "))

      }
    }

    // next if
    if (name == "bankcity2") {
      if (e.target.value === "Select Bank City") {
        setbdk_st_city();
        setbdk_st_branch();
      } else {
        setbdk_st_branch();
        setbdk_st_city(e.target.value.replaceAll("_", " "))
      }
    }
    // next if
    if (name == "bankbranch") {
      if (e.target.value === "Select Bank Branch") {
        setbdk_st_branch();
      } else {
        setbdk_st_branch(e.target.value.replaceAll("_", " "))
      }
    }
  }

  // for state set 
  let for_state_set = [];
  bank_db_filtered !== undefined && bank_db_filtered.map((item) => {
    for_state_set.push(item.STATE)
  })
  for_state_set = Array.from(new Set(for_state_set));
  for_state_set.sort();
  // for city2 set
  let bnk_city2_set = [];
  for_state_set !== undefined && bdk_state && bank_db_filtered.map((item) => {
    if (item.STATE === bdk_state) {
      bnk_city2_set.push(item.CITY2)
    }
  })
  bnk_city2_set = Array.from(new Set(bnk_city2_set));
  bnk_city2_set.sort();

  // for branch set
  let bnk_city_brnch = [];
  bnk_city2_set !== undefined && bank_db_filtered !== undefined && bank_db_filtered.map((item) => {
    if (item.CITY2 === bdk_st_city) {
      bnk_city_brnch.push(item.BRANCH)
    }
  })
  bnk_city_brnch = Array.from(new Set(bnk_city_brnch));
  bnk_city_brnch.sort();

  // data display 
  let data_display = [];
  let data_bk_id = 1;
  bdk_st_branch !== undefined && bank_db_filtered.map((item) => {
    if (item.BRANCH === bdk_st_branch) {
      let temp = {
        ...item,
        data_bk_id
      }
      data_display.push(temp)
      data_bk_id = data_bk_id + 1;
    }
  })
  return (

    <>
      <HeadSeo />

      <div className="container col-xl-12 col-xxl-10 px-4 py-3">
        <div className="row lg-5 py-3">
          <div className="col-lg-5 text-center text-lg-start py-4 mb-3 sectionn sect1">
            <h1 className="display-4 fw-bold lh-1 mb-3">Banking IFSC Codes</h1>
            {/* <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p> */}
            <form className="container pt-3">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="input_bankname">Select Bank Name</label>
                  <div>
                    <select name="input_bankname" id="Bank Name" className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e, "bankname") }}>
                      <option defaultValue="selected">Select Bank Name</option>
                      {bankname_db.map((item) => {
                        return (
                          <option key={item.bank_id} value={item.BANK_NAME.replaceAll(" ", "_")} style={{ overflowY: "auto", maxHeight: "238px", maxWidth: "50%" }}>
                            {" "}{item.BANK_NAME.replaceAll("_", " ")}{" "}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>


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
                <div className="form-group col-md-12">
                  <label htmlFor="input_bankname">Select Bank City</label>
                  <div>
                    <select name="input_bankname" id="Bank Name" className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e, "bankcity2") }}>
                      <option defaultValue="selected">Select Bank City</option>
                      {bnk_city2_set.map((item) => {
                        return (
                          <option key={item} value={item.replaceAll(" ", "_")} style={{ overflowY: "auto", maxHeight: "238px", maxWidth: "50%" }}>
                            {" "}{item.replaceAll("_", " ")}{" "}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>


                <div className="form-group col-md-12">
                  <label htmlFor="input_bankname center">Select Bank Branch</label>
                  <div>
                    <select name="input_bankname" id="Bank Name" className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e, "bankbranch") }}>
                      <option defaultValue="selected">Select Bank Branch</option>
                      {bnk_city_brnch.map((item) => {
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
          </div>
          {bdk_st_branch !== undefined && bank_db_filtered != undefined ? <div className="pl-3 col-md-11 mx-auto col-lg-6 sectionn sidesection">
            {bdk_st_branch && bdk_st_branch && <div className='container-fluid flex center '>
              {bdk_st_branch !== undefined && bank_db_filtered.map((item) => {
                if (item.BRANCH === "RTGS-HO") {
                  return <p className='text-center border-bottom'><a
                    href={`${item.BANK.replaceAll(" ", "_")}?s=${item.STATE.replaceAll(" ", "_")}&&c2=${item.CITY2.replaceAll(" ", "_")}&&bnh=${item.BRANCH.replaceAll(" ", "_")}`}
                  ><FcLibrary/><FcNext/> RTGS-HO Office details</a></p>
                }
              })}
              <Bnk_details data_display={data_display} />
            </div>}
          </div> : ""}
        </div>



      </div>

    </>

  )
}
