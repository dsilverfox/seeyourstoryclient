import React from 'react';
import ExampleDisplay from './Example/ExampleDisplay';
// import AuthDisplay from "./Auth/AuthDisplay"
import UserLogic from './User/UserLogic';

interface loginProps {
  updateToken: (newToken: string) => void
  setAdmin: (b: boolean) => void
  setUsername: (s: string) => void
  setUserId: (i: string) => void
  sessionToken: string | null,
}


class Unprotected extends React.Component<loginProps, {}> {
  constructor(props: loginProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <>
        <UserLogic updateToken={this.props.updateToken} setAdmin={this.props.setAdmin} setUsername={this.props.setUsername} setUserId={this.props.setUserId} sessionToken={this.props.sessionToken} />
        <ExampleDisplay />
        </>
      </div>
    )
  }
}
export default Unprotected;