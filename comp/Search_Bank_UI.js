import CopyToClipboard from "react-copy-to-clipboard";
import Breadcumb from "./Breadcumb";
import { FcSurvey } from "react-icons/fc";

function Search_Bank_UI(props) {
  return (
    <div>
      <Breadcumb data={props?.data_display} url={props?.head_url} />
      <main id="main">
        <section id="blog" className="blog">
          <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-8">
                {props.data_display.map((item) =>
                  <div key={item.IFSC}>

                    <article className="blog-details">
                      {/* <h2 className="bnk-dtl-h2">AHMEDABAD MERCANTILE COOPERATIVE BANK, NAVRANGPURA Branch is IFSC AMCB0660016.</h2> */}
                      <div className="content">
                        <div className="d-flex  bnk-img">
                          <img src="assets/Logo/def_bnk_logo.png" className="flex-shrink-0" alt={`${item.BANK.replaceAll(" ", "_")} logo`} />
                        </div>
                        {/* <h3 className="h3-bnk-title text-center">{item.IFSC}-{item.BANK}</h3> */}
                        <div className='container mb-3 text-break mt-2 carddds'>
                          <>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Name</td>
                                  <td colSpan="2">{item.BANK}</td>
                                </tr>
                                <tr>
                                  <td>IFSC</td>
                                  <td colSpan="2" className="ifsc_code_caption ifsccode-text">{item.IFSC}  <CopyToClipboard text={item.IFSC}><button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="tooltip" data-placement="right" title="Copy IFSC Code"><FcSurvey />Copy</button></CopyToClipboard></td>
                                </tr>
                                <tr>
                                  <td>Bank Code</td>
                                  <td colSpan="2" className="ifsc_code_caption ifsccode-text">{item.IFSC.slice(0, 5)}<p>(First 5 Letters of IFSC Code)</p></td>
                                </tr>
                                <tr>
                                  <td>Branch Code</td>
                                  <td colSpan="2" className="ifsc_code_caption ifsccode-text">{item.IFSC.slice(-6)}<p>(Last 6 Letters of IFSC Code)</p></td>
                                </tr>
                                <tr>
                                  <td>State</td>
                                  <td colSpan="2">{item.STATE}</td>
                                </tr>
                                <tr>
                                  <td>Branch</td>
                                  <td colSpan="2">{item.BRANCH}</td>
                                </tr>
                                <tr>
                                  <td>Address</td>
                                  <td colSpan="2">{item.ADDRESS}</td>
                                </tr>
                                <tr>
                                  <td>Contact</td>
                                  <td >STD : {item.STD_CODE} </td>
                                  <td>Phone No : {item.PHONE}  <CopyToClipboard text={item.PHONE}><button className="btn btn-sm btn-outline-secondary" type="button" data-toggle="tooltip" data-placement="right" title="Copy Number"><FcSurvey />Copy</button></CopyToClipboard></td>
                                </tr>
                                <tr>
                                  <td>Map  <small>(Beta)</small></td>
                                  <td className="table-side"><a href={`https://www.google.com/maps/search/${item.BANK} ${item.BRANCH},${item.STATE}`} target="_blank"> Google Map Link</a></td>
                                  <td><a href={`https://www.mappls.com/search=${item.BANK} ${item.BRANCH},${item.STATE}`} target="_blank"> MapMyIndia <small>(Mappls) Link</small></a></td>
                                </tr>
                              </tbody>
                            </table>
                            <>
                             <div className="table-responsive-sm pt-4 ">
                             <table className="table table-bordered table_ifsc_map pt-4 ">
                             <caption className="caption-tb-map">- IFSC Code Map</caption>
                                <tbody className="tbl_main_class">
                                  <tr>
                                    <td className="table-side-header">Digit</td>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>9</td>
                                    <td>10</td>
                                    <td>11</td>
                                  </tr>
                                  <tr>
                                    <td scope="row" className="table-side-header " >IFSC Code</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(0, 1)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(1, 2)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(2, 3)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(3, 4)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(4, 5)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(5, 6)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(6, 7)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(7, 8)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(8, 9)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(9, 10)}</td>
                                    <td className="ifsccode-text">{item.IFSC.slice(10, 11)}</td>
                                  </tr>
                                  <tr>
                                    <td scope="row" className="table-side-header">---</td>
                                    <td colspan="4" className="text-center">Bank Code</td>
                                    <td className="ifsccode-text">0</td>
                                    <td colspan="6" >Branch Code</td>
                                  </tr>
                                </tbody>
                              </table>
                             </div>
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
                    {/* <div className="post-author d-flex align-items-center">for adsense</div> */}

                  </div>
                )
                }
              </div>

              <div className="col-lg-4">
                <div className="sidebar">
                  BANK IFSC-Code | QPkendra
                  {/* <div className="sidebar-item search-form">
                        <h3 className="sidebar-title">Search</h3>
                        <form action="" className="mt-3">
                          <input type="text" />
                          <button type="submit"><i className="bi bi-search"></i>Search</button>
                        </form>
                      </div> */}
                  {/* <!-- End sidebar search formn--> */}

                  {/* <div className="sidebar-item categories">
                        <h3 className="sidebar-title">Categories</h3>
                        <ul className="mt-3">
                          <li><a href="#">General <span>(25)</span></a></li>
                          <li><a href="#">Lifestyle <span>(12)</span></a></li>
                          <li><a href="#">Travel <span>(5)</span></a></li>
                          <li><a href="#">Design <span>(22)</span></a></li>
                          <li><a href="#">Creative <span>(8)</span></a></li>
                          <li><a href="#">Educaion <span>(14)</span></a></li>
                        </ul>
                      </div> */}

                  {/* <!-- End sidebar categories--> */}

                  {/* <!-- End sidebar recent posts--> */}

                  {/* <div className="sidebar-item tags">
                        <h3 className="sidebar-title">Tags</h3>
                        <ul className="mt-3">
                          <li><a href="#">App</a></li>
                          <li><a href="#">IT</a></li>
                          <li><a href="#">Business</a></li>
                          <li><a href="#">Mac</a></li>
                          <li><a href="#">Design</a></li>
                          <li><a href="#">Office</a></li>
                          <li><a href="#">Creative</a></li>
                          <li><a href="#">Studio</a></li>
                          <li><a href="#">Smart</a></li>
                          <li><a href="#">Tips</a></li>
                          <li><a href="#">Marketing</a></li>
                        </ul>
                      </div> */}
                  {/* <!-- End sidebar tags--> */}
                </div>
                {/* <!-- End Blog Sidebar --> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Search_Bank_UI;