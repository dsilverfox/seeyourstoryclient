import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'
import UserDisplay from '../UnprotectedRoutes/User/UserDisplay'

interface protectedProps {
    sessionToken: string | null
    hasAdmin: boolean
    username: string,
    userId: string
    setStoryId: (s: string) => void
}

class Protected extends React.Component<protectedProps, {}> {
    constructor(props: protectedProps) {
        super(props)
    }
    adminUser = () => {
        console.log(this.props.hasAdmin)
        return (this.props.hasAdmin === true ? <AdminLogic sessionToken={this.props.sessionToken} /> : null)
    }
    render() {
        return (
            <div>
                {this.adminUser()}
                <UserDisplay username={this.props.username} userId={this.props.userId} />
                <StoriesLogic sessionToken={this.props.sessionToken} setStoryId={this.props.setStoryId}/>

            </div>
        )
    }
}

export default Protected;