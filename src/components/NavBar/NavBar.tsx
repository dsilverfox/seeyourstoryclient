import React from 'react';
import {Navbar, Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

interface navProps {
      clickLogout:  React.MouseEventHandler<HTMLButtonElement>
      username: string
      userId: string
}
class AppBar extends React.Component<navProps, {}> {

    render(): React.ReactNode {
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
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
                Welcome, {localStorage.getItem('localName')}
            <br/>
                UserID: {localStorage.getItem('localUserId')}
            <Link to="/"><Button type="button" variant="outline-light" className="logout" onClick={this.props.clickLogout}> Logout </Button></Link>
        </Navbar>
        </>
    )
    }
}


export default AppBar;