import React from 'react';
import { Card, Button } from 'react-bootstrap'

interface UserDisplayProps {
    username: string,
    userId: string
}

class UsersDisplay extends React.Component<UserDisplayProps, {}> {
    constructor(props: UserDisplayProps) {
        super(props)
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Welcome {this.props.username}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UsersDisplay;