import bankname_db from '../json/bank_name'
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import HeadSeo from '@/comp/HeadSeo';


export default function index() {
  let routerdata=useRouter();
  const [bdk_nme, setbdk_nme] = useState();
  var [bank_db_filtered, setbank_db_filtered] = useState([]);

  function handleChange(e, name) {
    if (name == "bankname") {
      if (e.target.value === "Select Bank Name") {
        setbdk_nme();
        
      } else {
        setbdk_nme(e.target.value.replaceAll(" ","_"));
        routerdata.push(`${e.target.value.replaceAll(" ","_")}`)
      }
    }
  }

  
  return (
    <>
    <HeadSeo/>
      <>
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
          </div>
        </form>
                
       
      </>

    </>
  )
}
