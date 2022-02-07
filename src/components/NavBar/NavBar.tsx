import React from 'react';
// import { Navbar, NavbarBrand } from 'reactstrap';


interface navProps {
      clickLogout:  React.MouseEventHandler<HTMLButtonElement>
}
const AppBar = (props: navProps) => {

    return(
        <div className="Navlist">
            {/* <Navbar>
                <NavbarBrand href="/"> */}
            <h1>See Your Story</h1>
                {/* </NavbarBrand> */}
            <button onClick={props.clickLogout}> Logout </button>
             {/* </Navbar> */}
        </div>
    )
}


export default AppBar;