import Breadcumb from "./Breadcumb";
import Bnk_dtl_main_Table from "./bankdetails_page/Bnk_dtl_main_Table";
import Sidebar from "./Sidebar";

function Search_Bank_UI(props) {
  return (
    <>
    <Breadcumb data={props?.data_display} />
      <main id="main">
        <section id="blog" className="blog">
          <div className="container ">
            <div className="row g-5">
              <div className="col-lg-8">
                {props.data_display.map((item) =>
                  <div key={item.IFSC}>
                    <Bnk_dtl_main_Table item={item}/>
                    {/* <div className="post-author d-flex align-items-center">for adsense</div> */}
                  </div>
                )
                }
              </div>
                {/* sidebar starts */}
              <Sidebar/>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Search_Bank_UI;