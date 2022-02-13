import React from 'react';
import './App.css';
import Protected from './components/ProtectedRoutes/Protected';
import Unprotected from './components/UnprotectedRoutes/Unprotected';
import NavBar from './components/NavBar/NavBar';


export interface tokenState {
  sessionToken: string | null
  hasAdmin: boolean
  username: string
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

  updateToken = (newToken: string) => {
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
    // localStorage.setItem('localName', s)
    this.setState({username: s})
  }

  setUserId =(i: string) => {
    // localStorage.setItem('localUserId', i)
    this.setState({userId: i})
  }
  
//If the user has a valid token show the protected views, if they do not show unprotected.
  protectedViews = () => {
    console.log("Session Token on APP.JS", this.state.sessionToken)
    return (this.state.sessionToken === localStorage.getItem('token') ? <Protected  sessionToken={this.state.sessionToken} hasAdmin={this.state.hasAdmin} username={this.state.username} userId={this.state.userId} /> : <Unprotected  sessionToken={this.state.sessionToken} updateToken={this.updateToken} setAdmin={this.setAdmin} setUsername={this.setUsername} setUserId={this.setUserId}/>)
  }

  render() {
    return (
      <div className="App">
          <NavBar clickLogout={this.clearToken} username={this.state.username} userId={this.state.userId}/>
          {this.protectedViews()}
      </div>
    )
  }
}


export default App;

//updateToken={updateToken}