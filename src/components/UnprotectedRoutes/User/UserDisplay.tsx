import React from 'react';
import { Card, Button } from 'react-bootstrap'

interface UserDisplayProps {
    username: string,
    userId: string
}

class UsersDisplay extends React.Component<UserDisplayProps, {}> {

    render(): React.ReactNode {
        console.log("UserName at User Display", this.props.username)
        console.log("UserID at User Display", this.props.userId)
        return (
            <div>
                <Card style={{ width: '10rem', height: '10rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Welcome {this.props.username}</Card.Title>
                        <Card.Text>
                            Your user ID is {this.props.userId}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UsersDisplay;