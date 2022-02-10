import React from 'react';
import {Navbar, Container} from 'react-bootstrap'


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
            Welcome, {this.props.username}
            <br/>
            UserID: {this.props.userId}
            <button className="logout" onClick={this.props.clickLogout}> Logout </button>
        </Navbar>
        </>
    )
    }
}


export default AppBar;