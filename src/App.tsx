import React from 'react';
import './App.css';
import Protected from './components/ProtectedRoutes/Protected';
import Unprotected from './components/UnprotectedRoutes/Unprotected';
import NavBar from './components/NavBar/NavBar';

interface tokenState{
  sessionToken: string | null,
  newToken: string
}

class App extends React.Component<{}, tokenState> {
  constructor(props: tokenState){
    super(props)
    this.state = {
      sessionToken: '',
      newToken: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')});
    }
  }

   updateToken = (newToken:string) => {
    const sessionToken = this.state.sessionToken;
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
    console.log(sessionToken);
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: " "})
  }


   protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem('token') ? <Protected token={this.state.sessionToken} updateToken={this.updateToken} /> : <Unprotected />)
  }
  render(){
  return (
    <div className="App">
      <NavBar clickLogout={this.clearToken}/>
      {this.protectedViews()}
    </div>
  )
  }
}


export default App;
//updateToken={updateToken}