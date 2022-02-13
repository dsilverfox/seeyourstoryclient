import React from 'react';
import { Card, Button } from 'react-bootstrap'
import APIURL from "../../../helpers/environment";

interface UserDisplayProps {
    sessionToken: string | null
    username: string,
    userId: string
}

interface DisplayVars {
    userId:string
}

class UsersDisplay extends React.Component<UserDisplayProps, DisplayVars> {
    constructor(props: UserDisplayProps){
        super(props) 
            this.state = {
                userId: "",
            }
    }
    //DELETE USER ACCOUNT
    deleteUserAccount = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        await this.setState({userId: id})
        await fetch(`${APIURL}/auth/delete/${this.state.userId}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        console.log("Account Deleted")
    }

    render(): React.ReactNode {
        console.log("UserName at User Display", this.props.username)
        console.log("UserID at User Display", this.props.userId)
        return (
            <div>
                <Card style={{ width: '10rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Welcome {this.props.username}</Card.Title>
                        <Card.Text>
                            Your user ID is {this.props.userId}
                        </Card.Text>
                        <Button variant="danger" onClick={(event) => {
                            const confirmBox = window.confirm("Do you really want to delete your account?This cannot be undone and will erase ALL content PERMANENTLY and INSTANTLY. WE WILL NOT BE ABLE TO RECOVER THIS INFORMATION")
                            if (confirmBox === true) { this.deleteUserAccount((event), this.state.userId) }
                        }}> Delete Account </Button> 
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UsersDisplay;

