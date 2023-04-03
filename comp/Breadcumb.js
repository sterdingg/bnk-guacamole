function Breadcumb(props) {
    let generated_head_url=`${props.data[0]?.BANK?.replaceAll(" ","_")}?s=${props.data[0]?.STATE?.replaceAll(" ","_")}&c2=${props.data[0]?.CITY2?.replaceAll(" ","_")}&bnh=${props.data[0]?.BRANCH?.replaceAll(" ","_")}`;
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-left">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href={`/${props.data[0]?.BANK?.replaceAll(" ","_")}`}>{`${props.data[0]?.BANK}`}</a></li>
                            {/* <li><a href={`${props.url}`}>{`${props.data[0].BRANCH}`}</a></li> */}
                            {props?.is_ifsc_aspath && props?.is_ifsc_aspath==true?
                            <li><a href={`${props?.head_url}`}>{`${props.data[0]?.IFSC}`}</a></li>:<li><a href={`/${generated_head_url}`}>{`${props.data[0]?.BRANCH}`}</a></li> }
                        </ol>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Breadcumb;