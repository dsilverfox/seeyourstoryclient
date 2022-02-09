import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'

interface protectedProps {
    sessionToken: string
}

const Protected = (props:protectedProps) => {

    return (
        <div>
            <StoriesLogic sessionToken={props.sessionToken} />
            I will hold Admin, Characters, Journal, Stories and User
        </div>
    )
}

export default Protected;