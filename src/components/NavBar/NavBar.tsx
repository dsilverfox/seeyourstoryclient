import React from 'react';

interface navProps {
      clickLogout:  React.MouseEventHandler<HTMLButtonElement>
}
const NavBar = (props: navProps) => {

    return(
        <div>
            <h1>See Your Story</h1>
            <button onClick={props.clickLogout}> Logout </button>
        </div>
    )
}


export default NavBar;