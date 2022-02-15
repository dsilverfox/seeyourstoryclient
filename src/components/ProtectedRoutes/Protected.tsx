import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'
import UserDisplay from '../UnprotectedRoutes/User/UserDisplay'
import CharactersLogic from './Characters/CharactersLogic';
import {Route} from 'react-router-dom';

interface protectedProps {
    clearToken: React.MouseEventHandler<HTMLButtonElement>,
    sessionToken: string | null
    hasAdmin: boolean
    username: string,
    userId: string,
    storyId: string
    setStoryId: (i:string) => void
    updateToken: (newToken: string) => void
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
                <StoriesLogic storyId={this.props.storyId} sessionToken={this.props.sessionToken} userId={this.props.userId} setStoryId={this.props.setStoryId} />
                <Route path='/characters' element={<CharactersLogic storyId={this.props.storyId} sessionToken={this.props.sessionToken} userId={this.props.userId} />} />
            </div>
        )
    }
}

export default Protected;