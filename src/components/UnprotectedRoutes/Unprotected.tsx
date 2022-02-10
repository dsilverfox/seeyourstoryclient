import React from 'react';
import ExampleDisplay from './Example/ExampleDisplay';
// import AuthDisplay from "./Auth/AuthDisplay"
import UserLogic from './User/UserLogic';

interface loginProps {
  updateToken: (newToken: string) => void
  setAdmin: (b: boolean) => void
  }
  

const Unprotected = (props: loginProps) => {
  console.log(props)
    return (
        <div>
          <UserLogic updateToken={props.updateToken} setAdmin={props.setAdmin} />
          <ExampleDisplay/>
        </div>
    )
}

export default Unprotected;