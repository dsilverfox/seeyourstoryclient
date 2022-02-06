import React from 'react';

import {tokenState} from "../../../App";

interface AdminVars extends tokenState{
    users: object
}

class AdminLogic extends React.Component <tokenState, AdminVars> {
    constructor(props: AdminVars){
        super(props)
        this.state = {
            users: {},
            sessionToken: " ",
            token: " ",
            updateToken: " "
        }
    }

//VIEW ALL USERS
    viewUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("http://localhost:3000/auth/userinfo", {
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
        await fetch("http://localhost:3000/auth/delete/:id", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization":`Bearer ${this.props.token}`
            })
        })
        .then(() => this.viewUsers(event));
    }
    

    render() {
        return(
            <div className="Admin">
                <h1>Greeting Admin!</h1>
                <p>You can perform three functions from this page. You can delete your account. You can view all users on the site and using their ID you can delete any user.</p>
                <button onClick={(event) => {this.viewUsers(event)}}>View Users</button>
                <button onClick={(event) => {this.deleteUsers(event)}}>Delete User</button>
            </div>
        )
    }
}

export default AdminLogic;