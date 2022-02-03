import React from 'react';

const NavBar = (props:any) => {
    return(
        <div>
            <button onClick={props.clickLogout}> Logout </button>
        </div>
    )
}

export default NavBar;