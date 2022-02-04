import React from 'react';

interface AdminVars {
    users: object
}


class AdminLogic extends React.Component <{}, AdminVars> {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    
    viewUsers = async (event: React.SyntheticEvent) => {
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

    render() {
        return(
            <div className="Buttons">
                <button onClick={(event) => {this.viewUsers}}>View Users</button>
            </div>
        )
    }
}