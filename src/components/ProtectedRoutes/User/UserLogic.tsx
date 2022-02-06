import React from "react";
import { tokenState } from "../../../App";
const Radium = require('radium');


interface UserVars extends tokenState {
    username: string,
    password: string,
}

class UserLogic extends React.Component<tokenState, UserVars> {
    constructor(props: UserVars) {
        super(props)
        this.state = {
            sessionToken: " ",
            token: " ",
            updateToken: " ",
            username: " ",
            password: " "
        }
    }
//REGISTER USER
    registerUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            body: JSON.stringify({ user: { 
                username: this.state.username,
                password: this.state.password,
             }, }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((response) => response.json())
            .then((data) => {
                this.props.updateToken(data.sessionToken)
            })
    }

//LOGIN USER
    loginUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            body: JSON.stringify({ user: { 
                username: this.state.username, 
                password: this.state.password, }, }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((response) => response.json())
            .then((newToken) => {
                this.props.updateToken(newToken.sessionToken)
            })
    }

//DELETE USER ACCOUNT
    deleteUserAccount = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("http://localhost:3000/auth/delete/:id", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            })
        })
    }
   
    render() {
        return (
            <div className="UserInput">
                <button onClick={(event) => { this.registerUsers(event) }}>Register</button>

                <button onClick={(event) => { this.loginUsers(event) }}>Login</button>

                {/* <button onClick={(event) => { this.deleteUserAccount(event) }}>Delete Account</button> */}
            </div>
        )
    }
}

export default Radium(UserLogic);
