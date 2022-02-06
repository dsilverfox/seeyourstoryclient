import React from 'react';
import './App.css';
import Protected from './components/ProtectedRoutes/Protected';
import Unprotected from './components/UnprotectedRoutes/Unprotected';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

export interface tokenState {
  sessionToken: string | null
  token: string | null
  updateToken: any
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

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token') });
    }
  }

  updateToken = (newToken: string) => {
    const sessionToken = this.state.sessionToken;
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
    console.log(sessionToken);
    return newToken;
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: " " })
  }


  protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem('token') ? <Protected token={this.state.sessionToken} updateToken={this.state.updateToken} /> : <Unprotected />)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar clickLogout={this.clearToken} />
        </Router>
        {this.protectedViews()}
      </div>
    )
  }
}


export default App;
//updateToken={updateToken}