import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'
import UserDisplay from '../UnprotectedRoutes/User/UserDisplay'

interface protectedProps {
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
                <UserDisplay sessionToken={this.props.sessionToken} username={this.props.username} userId={this.props.userId} />
                <StoriesLogic sessionToken={this.props.sessionToken} />

            </div>
        )
    }
}

export default Protected;