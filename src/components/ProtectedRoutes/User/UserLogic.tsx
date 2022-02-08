import React from "react";
import { tokenState } from "../../../App";



export interface UserVars extends tokenState {
    username: {value: string},
    password: {value: string}
}

class UserLogic extends React.Component<tokenState, UserVars> {
    constructor(props: UserVars) {
        super(props)
        this.state = {
            sessionToken: " ",
            token: " ",
            updateToken: " ",
            username: { value: '' },
            password: { value: '' }
        }
    }


//REGISTER USER
    registerUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Username State", this.state.username, "PASSWORD STATE", this.state.password)
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/auth/signup", {
            method: "POST",
            body: JSON.stringify({ user: { 
                username: this.state.username.value,
                password: this.state.password.value,
             }, }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((response) => response.json())
            .then((data) => {
                console.log("DATA FOR SETSTATE TOKEN", data)
                this.setState({updateToken: data})
            })
    }

//LOGIN USER
    loginUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/auth/login", {
            method: "POST",
            body: JSON.stringify({ user: { 
                username: this.state.username.value, 
                password: this.state.password.value, }, }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((response) => response.json())
            .then((newToken) => {
                this.state.updateToken(newToken.sessionToken)
            })
    }

//DELETE USER ACCOUNT
    deleteUserAccount = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("https://seeyourstoryserver.herokuapp.com/auth/delete/:id", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            })
        })
    }

    handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: {value: event.target.value}})
        console.log("USERNAME INPUT:", event.target.value)
        }
    
    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: {value: event.target.value} })
        console.log("PASSWORD INPUT:", event.target.value)
    }
   
    render() {
        return (
            <div className="UserInput">
                <form>
                    <label>Username:</label>
                    <input type="text" placeholder="Enter your username"
                    value={this.state.username.value}
                    onChange={this.handleUsername}></input>


                    <label>Password:</label>
                    <input type="password"
                    value={this.state.password.value}
                    onChange={this.handlePassword}></input>

                    <button onClick={(event) => { this.loginUsers(event) }}>Login</button>
                    <button onClick={(event) => { this.registerUsers(event) }}>Register</button>

                </form>

                {/* <button onClick={(event) => { this.deleteUserAccount(event) }}>Delete Account</button> */}
            </div>
        )
    }
}

export default UserLogic;
