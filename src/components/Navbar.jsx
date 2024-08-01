export const Navbar = (props) => {

    const { setPageNo ,pageNo } = props;
    
    return   <nav className="navbar bg-body-tertiary m-2">
                <div className="container-fluid">
                    {pageNo === 2 && <i className="fa fa-arrow-left" onClick={() => setPageNo(1)}></i>}
                </div>
            </nav>

}
