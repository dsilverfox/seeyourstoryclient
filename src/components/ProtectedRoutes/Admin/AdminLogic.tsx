import React from 'react';
import APIURL from '../../../helpers/environment'
import { Button } from 'react-bootstrap'


interface AdminProps {
    sessionToken: string | null
    hasAdmin: boolean
}

interface AdminVars {
    users: {
        id: string,
        username: string,
    }[]
    id: string,
    userListFire: boolean
}

class AdminLogic extends React.Component <AdminProps, AdminVars> {
    constructor(props: AdminProps){
        super(props)
        this.state = {
            id: "",
            users: [{
                id: "",
                username: "",
            }],
            userListFire: false,
        }
    }

//VIEW ALL USERS
    viewUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log(this.props.hasAdmin)
        await fetch(`${ APIURL }/auth/userinfo`, {
            method: "GET",
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": `${this.props.sessionToken}`
            }),
        })
        .then((res)=> res.json())
        .then((usersData) => {
            // console.log(usersData);
            this.setState({users: usersData.users});
        })
        this.userList();
        this.setState({userListFire: true})
    }

//DELETE A USER
    deleteUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // event.preventDefault();
        console.log(this.props.hasAdmin)
        console.log(this.state.id)
        await fetch(`${APIURL}/auth/delete/${this.state.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":`${this.props.sessionToken}`
            })
        })
        .then(() => this.viewUsers(event));
        console.log("User Deleted")
    }
    
    userList = () => {
        return this.state.users.map((user, index) => {
            return (
                <ol>
                    <li className="Userlist" key={index}>{index+1}: {user.username} -- {user.id}</li>
                    <Button variant="danger"
                        className="delete"
                        id='danger'
                        onMouseOver={(event) => {this.setState({id: user.id})}}
                        onClick={(event) => {
                            const confirmBox =
                                window.confirm(
                                    "Do you really want to delete this User? This action cannot be undone!"
                                )
                            if (confirmBox === true) {this.deleteUsers(event) }
                        }
                        }
                    > Delete </Button>
                </ol>
            )
        })
    };

    // handleID = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    //     this.setState({ id: this.state.id })
    // }

    render(): React.ReactNode {
        // console.log(this.state.users)
        return(
            <div className="Admin">
                <h1>Greetings Admin!</h1>

                <Button variant="outline-light" onClick={(event) => {this.viewUsers(event)}}>View Users</Button>

                {/* <label>User ID:</label>
                <input type="text"
                    value={this.state.id}
                    onChange={this.handleID}></input>

                <button
                    className="delete"
                    id='danger'
                    onClick={(event) => {
                        const confirmBox =
                            window.confirm(
                                "Do you really want to delete this User? This action cannot be undone!"
                            )
                        if (confirmBox === true) {this.deleteUsers(event)}
                    }
                    }
                > Delete </button> */}

                <>{this.state.userListFire && this.userList()}</>
                
            </div>
        )
    }
}

export default AdminLogic;
