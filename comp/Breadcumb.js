function Breadcumb(props) {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-left">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href={`/${props.data[0].BANK.replaceAll(" ","_")}`}>{`${props.data[0].BANK}`}</a></li>
                            <li><a href={`${props.url}`}>{`${props.data[0].BRANCH}`}</a></li>
                        </ol>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Breadcumb;