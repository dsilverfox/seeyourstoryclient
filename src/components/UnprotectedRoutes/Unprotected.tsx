import React from 'react';
import ExampleDisplay from './Example/ExampleDisplay';
// import AuthDisplay from "./Auth/AuthDisplay"
import UserLogic from '../ProtectedRoutes/User/UserLogic';

interface loginProps {
  sessionToken: string|null,
  token: string|null,
  updateToken: any

}

const Unprotected = (props: loginProps) => {
    return (
        <div>
          <UserLogic sessionToken={props.sessionToken} token={props.token} updateToken={props.updateToken}/>
          <ExampleDisplay/>
        </div>
    )
}

export default Unprotected;