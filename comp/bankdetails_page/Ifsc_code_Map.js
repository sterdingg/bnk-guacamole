function Ifsc_code_Map(props) {
    return (
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
                        <td className="ifsccode-text">{props.ifsc_map.slice(0, 1)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(1, 2)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(2, 3)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(3, 4)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(4, 5)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(5, 6)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(6, 7)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(7, 8)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(8, 9)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(9, 10)}</td>
                        <td className="ifsccode-text">{props.ifsc_map.slice(10, 11)}</td>
                    </tr>
                    <tr>
                        <td scope="row" className="table-side-header">---</td>
                        <td colSpan="4" className="text-center">Bank Code</td>
                        <td className="ifsccode-text">0</td>
                        <td colSpan="6" >Branch Code</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Ifsc_code_Map;