import React from 'react';
import StoriesLogic from './Stories/StoriesLogic'
import AdminLogic from './Admin/AdminLogic'

interface protectedProps {
    sessionToken: string | null
    hasAdmin: boolean
}

class Protected extends React.Component <protectedProps, {}> {
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

            <StoriesLogic sessionToken={this.props.sessionToken} />
            
            I will hold Admin, Characters, Journal, Stories and User
        </div>
    )
    }
}

export default Protected;