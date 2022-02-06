import React from 'react';

const AuthDisplay = (props: any) => {
    return (
        <div>
           <form>
               <label>Username:</label>
               <input type="text" placeholder="Enter your username"
               onChange={()=>props.setState({username: props.state.username})}></input>


               <label>Password:</label>
               <input type="password"
               onChange={()=>props.setState({password: props.state.password})}></input>
               
               <button onClick={(event) => { props.loginUsers(event) }}>Login</button>
               <button onClick={(event) => { props.registerUsers(event) }}>Register</button>
               
           </form>
        </div>
    )
}

export default AuthDisplay;