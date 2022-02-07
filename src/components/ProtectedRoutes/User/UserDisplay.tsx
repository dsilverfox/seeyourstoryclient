import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'
import { JsxElement } from 'typescript';

interface displayProps {
Card: JsxElement,

}

const UsersDisplay = (props: displayProps) => {
    return (
        <div>
            <Card className="profileCard" >
                {/* <CardImg className="Image" top width="100%" src={props.plant.imageurl} alt="Card image cap" /> */}
                <CardBody>
                    <CardTitle>Username: {props.user.username}</CardTitle>
                    <CardSubtitle>User ID: {props.plant.botname}</CardSubtitle>
                    {/* <CardText>Placeholder for when stretch goals allow more.</CardText> */}
                    {/* Not sure how to get the user ID */}
                 </CardBody>
            </Card> 
        </div>
    )
}

export default UsersDisplay;