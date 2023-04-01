import CopyToClipboard from "react-copy-to-clipboard";
import Bnk_dtl_main_Table from "./bankdetails_page/Bnk_dtl_main_Table";

function Bnk_details(props) {
  return (
    <div>
      {
        props.data_display.map((item) =>
          <div key={item.IFSC} className={`container mb-3 text-break mt-2 ${props.data_display.length>1?"border-bottom":""} carddds`}>
            <Bnk_dtl_main_Table item={item}/> 
            {/* <b><u>Bank Name</u></b> : <span className="at_span_bank_name">{item.BANK}</span>
            <p><b><u>Bank State</u></b>&nbsp; : {item.STATE}</p>
            <p><b><u>Branch Name</u></b> : <span className="at_span_bank_branch">{item.BRANCH}</span></p>
            <p><b><u>Bank Address</u></b> : {item.ADDRESS}</p>
            <p><b><u>Bank IFSC Code</u></b>: <span className='ifsccode-text at_span_bank_ifsccode'>{item.IFSC}</span> &nbsp;
              <CopyToClipboard text={item.IFSC}>
                <button type="button">
                  Copy IFSC Code
                </button>
              </CopyToClipboard></p>
            <>
              <p>
                <a className="btn" data-toggle="collapse" href={`#contact-${item.IFSC}`} role="button" aria-expanded="false" aria-controls={`contact-${item.IFSC}`}><u>Branch Contact Details</u></a>
              </p>
              <div className="collapse" id={`contact-${item.IFSC}`}>
                <p >STD CODE: {item.STD_CODE}&nbsp;| &nbsp;Phone Number: {item.PHONE}</p>
              </div>
            </> */}

            {/* ----- */}
            {/* <>
              <p>
                <a className="btn" data-toggle="collapse" href={`#map-${item.IFSC}`} role="button" aria-expanded="false" aria-controls={`map-${item.IFSC}`}>Map Location <small>(Beta)</small></a>
              </p>
              <div className="collapse" id={`map-${item.IFSC}`}>
                <p><a href={`https://www.mappls.com/search=${item.BANK} ${item.BRANCH},${item.STATE}`} target="_blank"> MapMyIndia <small>(Mappls) </small></a></p>
                <p><a href={`https://www.google.com/maps/search/${item.BANK} ${item.BRANCH},${item.STATE}`} target="_blank"> Google Map</a></p>

              </div>
            </> */}
          </div>
        )
      }
    </div>
  );
}

export default Bnk_details;