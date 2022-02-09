import React from 'react';
import ExampleDisplay from './Example/ExampleDisplay';
// import AuthDisplay from "./Auth/AuthDisplay"
import UserLogic from './User/UserLogic';

interface loginProps {
  updateToken: (newToken: string) => void
  }

const Unprotected = (props: loginProps) => {
  console.log(props)
    return (
        <div>
          <UserLogic updateToken={props.updateToken} />
          <ExampleDisplay/>
        </div>
    )
}

export default Unprotected;