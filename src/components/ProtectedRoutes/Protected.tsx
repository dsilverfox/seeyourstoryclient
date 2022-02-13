import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'
import UserDisplay from '../UnprotectedRoutes/User/UserDisplay'
import Navigation from '../Navigation/Navigation'
import CharactersLogic from './Characters/CharactersLogic';

interface protectedProps {
    clearToken: React.MouseEventHandler<HTMLButtonElement>,
    sessionToken: string | null
    hasAdmin: boolean
    username: string,
    userId: string
}

class Protected extends React.Component<protectedProps, {}> {

    adminUser = () => {
        console.log(this.props.hasAdmin)
        return (this.props.hasAdmin === true ? <AdminLogic sessionToken={this.props.sessionToken} hasAdmin={this.props.hasAdmin} /> : null)
    }
    render() {
        return (
            <div>
                {this.adminUser()}
                <UserDisplay clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} username={this.props.username} userId={this.props.userId} />
                <StoriesLogic sessionToken={this.props.sessionToken} />
                {/* <Navigation hasAdmin={this.props.hasAdmin} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} username={this.props.username} userId={this.props.userId}/> */}
                <CharactersLogic sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}

export default Protected;