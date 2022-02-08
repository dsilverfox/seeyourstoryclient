import React from 'react';
import './App.css';
import Protected from './components/ProtectedRoutes/Protected';
import Unprotected from './components/UnprotectedRoutes/Unprotected';
import NavBar from './components/NavBar/NavBar';


export interface tokenState {
  sessionToken: string | null
  token: string | null
  updateToken: any
  //correct updateToken to a real type just trying to get anything to display at all.
}


class App extends React.Component<{}, tokenState> {
  constructor(props: tokenState) {
    super(props)
    this.state = {
      sessionToken: " ",
      token: " ",
      updateToken: " ",
    }
  }
//If the user already has a token, get the token
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token') });
    }
  }

//If the user doesn't yet have a token, assign a token based on sign in
// RETURN NEWTOKEN ENTERED TO FIX ERROR BEING CALLED ON UPDATE TOKEN FUNCTION
  updateToken = (newToken: string) => {
    const sessionToken = this.state.sessionToken;
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
    console.log(sessionToken);
    return newToken;
  }

  //When the user logs out clear the token
  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: " " })
  }

//If the user has a valid token show the protected views, if they do not show unprotected.
  protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem('token') ? <Protected token={this.state.sessionToken} updateToken={this.state.updateToken} /> : <Unprotected sessionToken={this.state.sessionToken} token={this.state.token} updateToken={this.state.updateToken} />)
  }

  render() {
    return (
      <div className="App">
          <NavBar clickLogout={this.clearToken} />
          {this.protectedViews()}
      </div>
    )
  }
}


export default App;
//updateToken={updateToken}