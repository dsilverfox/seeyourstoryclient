import React from "react";
import APIURL from "../../../helpers/environment";
import {Alert} from 'react-bootstrap';

interface userProps {
    updateToken: (newToken: string) => void 
    setAdmin: (b: boolean) => void
    setUsername: (s: string) => void
    setUserId: (i: string) => void
    sessionToken: string | null
}

// export interface UserVars extends tokenState {
export interface UserVars {
    username: {value: string},
    password: {value: string},
    userId: string,
    validPass: boolean
    alertshow: boolean
}

// REGEX Variables
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class UserLogic extends React.Component<userProps, UserVars> {
    constructor(props: userProps) {
        super(props)
        this.state = {
            // sessionToken: " ",
            // token: " ",
            // updateToken: " ",
            username: { value: '' },
            password: { value: '' },
            userId: '',
            validPass: false,
            alertshow: false
        }
        this.analyze = this.analyze.bind(this);
    }
    
// REGEX ANALYZE

    setShow(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

    analyze(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (strongRegex.test(this.state.password.value) || mediumRegex.test(this.state.password.value)) {
            this.setState({validPass:true})
            this.registerUsers(event);
        } else {
            this.setState({validPass: false})
            return (
                <Alert variant="danger" show={this.state.alertshow} onClose={() => this.setState({alertshow: false}) } dismissible>
                    <Alert.Heading>Your password does not meet requirements!</Alert.Heading>
                    <p>
                        Your password MUST:
                        Must be 8 characters or longer.
                        Must contain at least 1 lowercase
                        Must contain at least 1 uppercase
                        Must contain at least 1 number
                        Must contain at least 1 special character
                    </p>
                </Alert>
            );
        }
    }

//REGISTER USER
    registerUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Username State", this.state.username.value, "PASSWORD STATE", this.state.password.value)
        event.preventDefault();
    fetch(`${APIURL}/auth/signup`,{
            method: "POST",
            body: JSON.stringify({ user: { 
                username: this.state.username.value,
                password: this.state.password.value,
             }, }),

            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
             }),
        }).then((response) => response.json())
            .then((data) => {
                console.log("DATA FOR SETSTATE TOKEN", data)
                console.log("Data for UserId", data.user.id)
                console.log("Data for Username", data.user)
                console.log("Data for hasAdmin?", data.user.hasAdmin)
                this.props.updateToken(data.sessionToken)
                this.props.setUsername(data.user.username)
                this.props.setUserId(data.user.id)
            })

            .catch(error => {
                console.log(error)
            })
    }

//LOGIN USER
    loginUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("Username State", this.state.username.value, "PASSWORD STATE", this.state.password.value)
        console.log()
        fetch(`${APIURL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                user: {
                    username: this.state.username.value,
                    password: this.state.password.value,
                },
            }),

            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            }),
        }).then((response) => response.json())
            .then((data) => {
                // console.log("DATA FOR SETSTATE TOKEN", data)
                // console.log("Data for UserId", data.user.id)
                // console.log("Data for Username", data.user.username)
                // console.log("Data for hasAdmin?", data.user.hasAdmin)
                console.log(data)
                if (data.user) {
                this.props.updateToken(data.sessionToken)
                this.props.setUsername(data.user.username)
                this.props.setUserId(data.user.id)
                this.props.setAdmin(data.user.hasAdmin)
                }
            })

            .catch(error => {
                console.log(error)
            })
    }



    handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: {value: event.target.value}})
        }

    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ password: { value: event.target.value } })
    }


    handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({userId: event.target.value})
    }
   
    render() {

        return (
            <div className="UserInput">
                <form>
                    <label>Username:</label>
                    <input type="text" placeholder="Enter a Username"
                    value={this.state.username.value}
                    onChange={this.handleUsername}/>


                    <label>Password:</label>
                    <input type="password"
                    value={this.state.password.value}
                    onChange={this.handlePassword}
                    />

                    <button onClick={(event) => { this.loginUsers(event) }}>Login</button>
                    <button onClick={(event) => { this.analyze(event) }}>Register</button>
                </form>
            </div>
        )
    }
}

export default UserLogic;


