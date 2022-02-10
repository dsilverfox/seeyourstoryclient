import React from 'react';
import './App.css';
import Protected from './components/ProtectedRoutes/Protected';
import Unprotected from './components/UnprotectedRoutes/Unprotected';
import NavBar from './components/NavBar/NavBar';


export interface tokenState {
  sessionToken: string | null
  hasAdmin: boolean
  username: string,
  userId: string
}

class App extends React.Component<{}, tokenState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      sessionToken: "",
      hasAdmin: false,
      username: "",
      userId: "",
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
    //const sessionToken only exists to create shorthand
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
  }

  //When the user logs out clear the token
  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: " " })
    console.log(this.state.sessionToken)
  }

  //Set State for hasAdmin
  setAdmin = (b: boolean) => {
    this.setState({hasAdmin: b})
  } 

  setUsername =(s: string) => {
    this.setState({username: s})
  }

  setUserId =(i: string) => {
    this.setState({userId: i})
  }

//If the user has a valid token show the protected views, if they do not show unprotected.
  protectedViews = () => {
    console.log("Session Token on APP.JS", this.state.sessionToken)
    return (this.state.sessionToken === localStorage.getItem('token') ? <Protected  sessionToken={this.state.sessionToken} hasAdmin={this.state.hasAdmin} username={this.state.username} userId={this.state.userId}  /> : <Unprotected  updateToken={this.updateToken} setAdmin={this.setAdmin} setUsername={this.setUsername} setUserId={this.setUserId}/>)
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