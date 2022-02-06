import React from 'react';
import {
    Route,
    Link,
    BrowserRouter
} from 'react-router-dom';
import Home from '../../App';

interface navProps {
      clickLogout:  React.MouseEventHandler<HTMLButtonElement>
}
const NavBar = (props: navProps) => {


    return(


        <div>
            <Link to = '/'>Home</Link>
            <BrowserRouter><Route path='../../App'><Home /></Route></BrowserRouter>
            <h1>See Your Story</h1>
            <button onClick={props.clickLogout}> Logout </button>
        </div>
    )
}

export default NavBar;