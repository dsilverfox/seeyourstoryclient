import React from 'react';

const Protected = (props:string|null) => {
    return (
        <div>
            I AM THE ProtectedRoutes!
            I will hold Admin, Characters, Journal, Stories and User
        </div>
    )
}

export default Protected;