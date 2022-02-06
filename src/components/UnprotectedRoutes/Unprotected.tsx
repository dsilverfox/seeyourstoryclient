import React from 'react';
import ExampleDisplay from './Example/ExampleDisplay';
import AuthDisplay from "./Auth/AuthDisplay"

const Unprotected = () => {
    return (
        <div>
          <AuthDisplay/>
          <ExampleDisplay/>
        </div>
    )
}

export default Unprotected;