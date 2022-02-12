import React from 'react';
import APIURL from '../../../helpers/environment'
interface AdminProps {
    sessionToken: string | null
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
            console.log(usersData);
            this.setState({users: usersData.users});
        })
        this.userList();
        this.setState({userListFire: true})
    }

//DELETE A USER
    deleteUsers = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        // event.preventDefault();
        console.log(this.state.id)
        await this.setState({id: this.state.id})
        await fetch(`${APIURL}/auth/delete/${this.state.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":`${this.props.sessionToken}`
            })
        })
        .then(() => this.viewUsers(event));
    }
    
    userList = () => {
        return this.state.users.map((user, index) => {
            return (
                <ol>
                    <li className="Userlist" key={index}>{index+1}: {user.username} -- {user.id}</li>
                </ol>
            )
        })
    };

    handleID = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ id: event.target.value})
    }

    render() {
        console.log(this.state.users)
        return(
            <div className="Admin">
                <h1>Greeting Admin!</h1>
                <p>You can perform three functions from this page. You can delete your account. You can view all users on the site and using their ID you can delete any user.</p>
                <button onClick={(event) => {this.viewUsers(event)}}>View Users</button>

                <label>User ID:</label>
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
                        if (confirmBox === true) {this.deleteUsers((event), this.state.id)}
                    }
                    }
                > Delete </button>

                <>{this.state.userListFire && this.userList()}</>
                
            </div>
        )
    }
}

export default AdminLogic;
