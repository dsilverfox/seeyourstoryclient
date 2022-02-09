import React from "react";

// import {Alert} from 'react-bootstrap';
interface userProps {
    updateToken: (newToken: string) => void
}

// export interface UserVars extends tokenState {
export interface UserVars {
    username: {value: string},
    password: {value: string},
    hasAdmin: boolean
    // userId: string,
}
//REGEX Variables
// const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
// const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class UserLogic extends React.Component<userProps, UserVars> {
    constructor(props: userProps) {
        super(props)
        this.state = {
            // sessionToken: " ",
            // token: " ",
            // updateToken: " ",
            username: { value: '' },
            password: { value: '' },
            hasAdmin: false
            // userId: ''
        }
        // this.analyze = this.analyze.bind(this);
    }
    
//REGEX ANALYZE

    // analyze(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //     if (strongRegex.test(this.state.password.value)) {
    //         return
    //     } else if (mediumRegex.test(this.state.password.value)) {
    //         return (
    //             <Alert variant="warning" onClose={() => setShow(false)} dismissible>
    //                 <Alert.Heading>Your password is Medium Strength</Alert.Heading>
    //                 <p>
    //                     Your password MUST:
    //                     Must be 8 characters or longer.
    //                     Must contain at least 1 lowercase
    //                     Must contain at least 1 uppercase
    //                     Must contain at least 1 number
    //                     Must contain at least 1 special character
    //                 </p>
    //             </Alert>
    //         );
    //     } else {
    //         return (
    //             <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    //                 <Alert.Heading>Your password does not meet requirements!</Alert.Heading>
    //                 <p>
    //                     Your password MUST:
    //                     Must be 8 characters or longer.
    //                     Must contain at least 1 lowercase
    //                     Must contain at least 1 uppercase
    //                     Must contain at least 1 number
    //                     Must contain at least 1 special character
    //                 </p>
    //             </Alert>
    //         );
    //     }
    // }

//REGISTER USER
    registerUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Username State", this.state.username.value, "PASSWORD STATE", this.state.password.value)
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/auth/signup", {
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
                // console.log("DATA FOR SETSTATE TOKEN", data)
                // console.log("Data for UserId", data.user.id)
                // console.log("Data for Username", data.user)
                // console.log("Data for hasAdmin?", data.user.hasAdmin)
                this.props.updateToken(data.sessionToken)
            })

            .catch(error => {
                console.log(error)
            })

        // this.analyze(event)
    }

//LOGIN USER
    loginUsers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("Username State", this.state.username.value, "PASSWORD STATE", this.state.password.value)
        fetch("https://seeyourstoryserver.herokuapp.com/auth/login", {
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
                console.log("DATA FOR SETSTATE TOKEN", data)
                console.log("Data for UserId", data.user.id)
                console.log("Data for Username", data.user.username)
                console.log("Data for hasAdmin?", data.user.hasAdmin)
                // this.setState({userId: {data.user.id}})
                // this.setState(this.hasAdmin:{data.user.hasAdmin})
                this.props.updateToken(data.sessionToken)
            })

            .catch(error => {
                console.log(error)
            })
    }

//DELETE USER ACCOUNT
    // deleteUserAccount = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     event.preventDefault();
    //     await fetch("https://seeyourstoryserver.herokuapp.com/auth/delete/:id", {
    //         method: "DELETE",
    //         headers: new Headers({
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${this.props.token}`
    //         })
    //     })
    // }

    handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: {value: event.target.value}})
        }
    
    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: {value: event.target.value} })
    }
   
    render() {

        return (
            <div className="UserInput">
                <form>
                    <label>Username:</label>
                    <input type="email" placeholder="Enter an email"
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
