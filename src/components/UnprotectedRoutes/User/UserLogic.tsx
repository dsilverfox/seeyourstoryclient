import React from "react";
import APIURL from "../../../helpers/environment";

// import {Alert} from 'react-bootstrap';
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
            userId: ''
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
                // console.log("DATA FOR SETSTATE TOKEN", data)
                // console.log("Data for UserId", data.user.id)
                // console.log("Data for Username", data.user)
                // console.log("Data for hasAdmin?", data.user.hasAdmin)
                this.props.updateToken(data.sessionToken)
                this.props.setUsername(data.user.username)
                this.props.setUserId(data.user.id)
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
                console.log("DATA FOR SETSTATE TOKEN", data)
                console.log("Data for UserId", data.user.id)
                console.log("Data for Username", data.user.username)
                console.log("Data for hasAdmin?", data.user.hasAdmin)
                this.props.setAdmin(data.user.hasAdmin)
                this.props.updateToken(data.sessionToken)
                this.props.setUsername(data.user.username)
                this.props.setUserId(data.user.id)
            })

            .catch(error => {
                console.log(error)
            })
    }

//DELETE USER ACCOUNT
    deleteUserAccount = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        await this.setState({userId: id})
        await fetch(`${APIURL}/auth/delete/${this.state.userId}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
    }

    handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: {value: event.target.value}})
        }
    
    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: {value: event.target.value} })
    }

    handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({userId: event.target.value})
    }
   
    render() {

        return (
            <div className="UserInput">
                <form>
                    <label>Username:</label>
                    <input type="email" placeholder="Enter a Username"
                    value={this.state.username.value}
                    onChange={this.handleUsername}></input>


                    <label>Password:</label>
                    <input type="password"
                    value={this.state.password.value}
                    onChange={this.handlePassword}></input>

                    <button onClick={(event) => { this.loginUsers(event) }}>Login</button>
                    
                    <button onClick={(event) => { this.registerUsers(event) }}>Register</button>
                    
                    <br/>
                   
                    <label>Delete Account:</label>
                    <input type="string"
                        value={this.state.userId}
                        onChange={this.handleUserId}></input>
                
                     <button onClick={(event) => {const confirmBox = window.confirm("Do you really want to delete your account?This cannot be undone and will erase ALL content PERMANENTLY and INSTANTLY. WE WILL NOT BE ABLE TO RECOVER THIS INFORMATION") 
                     if(confirmBox ===true){this.deleteUserAccount((event), this.state.userId) }}}> Delete Account </button> 
                </form>



            </div>
        )
    }
}

export default UserLogic;
