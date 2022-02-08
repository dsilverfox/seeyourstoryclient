import React from 'react';
import {Navbar, Container} from 'react-bootstrap'


interface navProps {
      clickLogout:  React.MouseEventHandler<HTMLButtonElement>
}
const AppBar = (props: navProps) => {

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt="Silverfox Standard Logo"
                        src="https://dsilverfox.github.io/Assets/SilverfoxWQuill%20(2).jpg"
                        width="60"
                        height="100"
                        className="Logo"
                    />{' '}
                    See Your Story
                </Navbar.Brand>
               
            </Container>
            <button className="logout" onClick={props.clickLogout}> Logout </button>
        </Navbar>
    )
}


export default AppBar;