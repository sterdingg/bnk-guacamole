function Breadcumb(props) {
    let headrrurl=`${props.data[0]?.BANK.replaceAll(" ","_")}?s=${props.data[0]?.STATE.replaceAll(" ","_")}&c2=${props.data[0]?.CITY2.replaceAll(" ","_")}&bnh=${props.data[0]?.BRANCH.replaceAll(" ","_")}`;
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-left">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href={`/${props.data[0]?.BANK.replaceAll(" ","_")}`}>{`${props.data[0]?.BANK}`}</a></li>
                            {/* <li><a href={`${props.url}`}>{`${props.data[0].BRANCH}`}</a></li> */}
                            <li><a href={`/${headrrurl}`}>{`${props.data[0]?.BRANCH}`}</a></li> 
                        </ol>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Breadcumb;