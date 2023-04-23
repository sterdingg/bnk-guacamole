import HeadSeo from '@/comp/HeadSeo';
import bankname_db from '../../json/bank_name'

function index() {
    // let db=[];
    return (
        <>
        <HeadSeo headtype={"List_Bank_Name"}/>
        <div className='container pt-4 '>
        <ol>  
       {bankname_db.map((item)=>{
        // db.push(`roottt/sitelink/${item.BANK_NAME.replaceAll(" ","_")}`)
           return  <li><p key={item.bank_id}><a href={`/sitelink/${item.BANK_NAME.replaceAll(" ","_")}`} prefetch="false">{item.BANK_NAME.replaceAll("_"," ")}  |   IFSC Code List</a></p></li>
            
        })}
        </ol>
        {/* {console.log(db)} */}
        </div>
        </>
    );
}

export default index;