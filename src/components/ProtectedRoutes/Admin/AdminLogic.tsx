import React from 'react';

import {tokenState} from "../../../App";

interface AdminVars extends tokenState{
    users: object
    id: { value: string }
}

class AdminLogic extends React.Component <tokenState, AdminVars> {
    constructor(props: AdminVars){
        super(props)
        this.state = {
            id: { value: '' },
            users: {},
            sessionToken: " ",
            token: " ",
            updateToken: " "
        }
    }

//VIEW ALL USERS
    viewUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("https://seeyourstoryserver.herokuapp.com/auth/userinfo", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then((res)=> res.json())
        .then((users) => {
            this.setState({users:{users}});
        })
    }

//DELETE A USER
    deleteUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("https://seeyourstoryserver.herokuapp.com/auth/delete/:id", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization":`Bearer ${this.props.token}`
            })
        })
        .then(() => this.viewUsers(event));
    }
    
    handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ id: { value: event.target.value } })
    }

    render() {
        return(
            <div className="Admin">
                <h1>Greeting Admin!</h1>
                <p>You can perform three functions from this page. You can delete your account. You can view all users on the site and using their ID you can delete any user.</p>
                <button onClick={(event) => {this.viewUsers(event)}}>View Users</button>

                <label>User ID:</label>
                <input type="text"
                    value={this.state.id.value}
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
                > Delete </button>
                
            </div>
        )
    }
}

export default AdminLogic;