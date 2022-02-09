import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'

interface protectedProps {
    sessionToken: string
}

const Protected = (props:protectedProps) => {

    // adminViews = () => {
        
    //     return (this.state.sessionToken === localStorage.getItem('token') ? <Protected sessionToken={this.state.sessionToken} /> : <Unprotected updateToken={this.updateToken} />)
    return (
        <div>
            <StoriesLogic sessionToken={props.sessionToken} />
            <AdminLogic sessionToken={props.sessionToken} />
            I will hold Admin, Characters, Journal, Stories and User
        </div>
    )
}

export default Protected;