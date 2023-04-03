import { FcSurvey } from "react-icons/fc";
import { GrMap } from "react-icons/gr";
import { TbPhone } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";
import CopyToClipboard from "react-copy-to-clipboard";
import Bnk_image from "./Bnk_image";
import Ifsc_code_Map from "./Ifsc_code_Map";

function Bnk_dtl_main_Table(props) {
    return (
        <article className="blog-details">
            {/* <h2 className="bnk-dtl-h2">AHMEDABAD MERCANTILE COOPERATIVE BANK, NAVRANGPURA Branch is IFSC AMCB0660016.</h2> */}
            <div className="content">
                <div className="d-flex bnk-img flex-shrink-0">
                    <Bnk_image img_ref="/assets/bank_logo/def_bnk_logo.png" img_width={100} img_height={100} img_alt={`${props.item.BANK}-logo`} />
                </div>
                {/* <h3 className="h3-bnk-title text-center">{props.item.IFSC}-{props.item.BANK}</h3> */}
                <div className='container mb-3 text-break mt-2 carddds'>
                    <>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td colSpan="2">{props.item.BANK}</td>
                                </tr>
                                <tr>
                                    <td>IFSC</td>
                                    <td colSpan="2" className="ifsc_code_caption ifsccode-text">{props.item.IFSC}  <CopyToClipboard text={props.item.IFSC}><button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="tooltip" data-placement="right" title="Copy IFSC Code"><FcSurvey />Copy</button></CopyToClipboard></td>
                                </tr>
                                <tr>
                                    <td>Bank Code</td>
                                    <td colSpan="2" className="ifsc_code_caption ifsccode-text">{props.item.IFSC?.slice(0, 5)}<p>(First 5 Letters of IFSC Code)</p></td>
                                </tr>
                                <tr>
                                    <td>Branch Code</td>
                                    <td colSpan="2" className="ifsc_code_caption ifsccode-text">{props.item.IFSC?.slice(-6)}<p>(Last 6 Letters of IFSC Code)</p></td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td colSpan="2">{props.item.STATE}</td>
                                </tr>
                                <tr>
                                    <td>Branch</td>
                                    <td colSpan="2">{props.item.BRANCH}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td colSpan="2">{props.item.ADDRESS}</td>
                                </tr>
                                <tr>
                                    <td>Contact <TiContacts/></td>
                                    <td >STD : {props.item.STD_CODE} </td>
                                    <td><TbPhone/>: {props.item.PHONE} <CopyToClipboard text={props.item.PHONE}><button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="tooltip" data-placement="right" title="Copy Number"><FcSurvey />Copy</button></CopyToClipboard></td>
                                </tr>
                                <tr>
                                    <td>Map  <small>(Beta)</small></td>
                                    <td className="table-side"><a href={`https://www.google.com/maps/search/${props.item.BANK} ${props.item.BRANCH},${props.item.STATE}`} target="_blank"><GrMap /> Google Map Link</a></td>
                                    <td><a href={`https://www.mappls.com/search=${props.item.BANK} ${props.item.BRANCH},${props.item.STATE}`} target="_blank"><GrMap /> MapMyIndia <small>(Mappls) Link</small></a></td>
                                </tr>
                            </tbody>
                        </table>
                        <>
                            <Ifsc_code_Map ifsc_map={props.item.IFSC} />
                        </>
                    </>
                </div>
            </div>

            {/* <div className="meta-bottom">
                        <i className="bi bi-folder"></i>
                        <ul className="cats">
                          <li><a href="#">Business</a></li>
                        </ul>
                        <i className="bi bi-tags"></i>
                        <ul className="tags">
                          <li><a href="#">Creative</a></li>
                          <li><a href="#">Tips</a></li>
                          <li><a href="#">Marketing</a></li>
                        </ul>
                      </div> */}
            {/* <!-- End meta bottom --> */}
        </article>
    );
}

export default Bnk_dtl_main_Table;