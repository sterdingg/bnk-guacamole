import { useState } from "react";
import Bnk_dtl_main_Table from "./bankdetails_page/Bnk_dtl_main_Table";

function Search_ifsc(props) {
    const [search_text, setsearch_text] = useState("");
    const [display_ifsc_data, setdisplay_ifsc_data] = useState("");

    const handleonclick = (e) => {
        e.preventDefault();
        if ((search_text !== "") && (search_text.length === 11) ) {
            props.bnk_data.map(async (item) => {
                if (item.IFSC.slice(0, 4) === search_text.slice(0, 4)) {
                    const nda = (await import(`../json/${item.bank_id}.json`)).default;
                    await nda !== undefined && nda !== null ? (nda.map((item) => {
                        (item.IFSC === search_text.toUpperCase()) ?
                            (setdisplay_ifsc_data(item))
                            :
                            ""
                    })) : "";
                }
            })
        }
    }

    const handletextchnage = (e) => {
        setsearch_text(e.target.value.toUpperCase())
    }

    return (
        <>
            <div className="container">
                <h5 className="lead text-center">Search Bank Details Using IFSC Codew</h5>
                <div className="bg-white p-5 rounded shadow">
                    {/* <!-- Underlined search bars with buttons --> */}
                    <form>
                        <div className="row">
                            <div className="form-group flex-fill col-sm  mb-2">
                                <input id="exampleFormControlInput5" type="text" placeholder="Enter IFSC Code for Bank Details" className="form-control form-control-underlined" value={search_text} onChange={e => handletextchnage(e)} />
                            </div>
                            <button type="submit" className="btn btn-primary rounded-pill mx-auto" disabled={(search_text.length === 11) ? false : true} onClick={handleonclick}>Search</button>
                        </div>
                    </form>
                    {/* <!-- End --> */}

                    {(display_ifsc_data && (display_ifsc_data !== undefined) && (display_ifsc_data !== null) && (display_ifsc_data!=="Error")) ? <Bnk_dtl_main_Table item={display_ifsc_data} /> :(display_ifsc_data=="Error")?<div className="container">Error IFSC Code Incorrect or Not Found</div>:""}
                </div>
            </div>
        </>
    );
}

export default Search_ifsc;