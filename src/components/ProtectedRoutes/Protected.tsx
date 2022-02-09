import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'

interface protectedProps {
    sessionToken: string
}

const Protected = (props:protectedProps) => {

    return (
        <div>
            <StoriesLogic sessionToken={props.sessionToken} />
            <AdminLogic sessionToken={props.sessionToken} />
            I will hold Admin, Characters, Journal, Stories and User
        </div>
    )
}

export default Protected;