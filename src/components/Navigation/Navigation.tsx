import React from 'react';
import App from '../../App'
import StoriesLogic from '../ProtectedRoutes/Stories/StoriesLogic'
import CharactersLogic from '../ProtectedRoutes/Characters/CharactersLogic'
import JournalLogic from '../ProtectedRoutes/Journal/JournalLogic';
import UsersDisplay from '../UnprotectedRoutes/User/UserDisplay';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'


interface passProps {
    clearToken: React.MouseEventHandler<HTMLButtonElement>,
    sessionToken: string | null
    hasAdmin: boolean
    username: string,
    userId: string,
    storyId: string
}

class Navigation extends React.Component<passProps, {}> {


    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<App />} />
                        <Route path='/users' element={<UsersDisplay clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} username={this.props.username} userId={this.props.userId} />} />
                        <Route path='/stories' element={<StoriesLogic sessionToken={this.props.sessionToken} userId={this.props.userId} />} />
                            <Route path = '/stories/edit'/>
                        <Route path='/characters' element={<CharactersLogic storyId={this.props.storyId}  sessionToken={this.props.sessionToken} userId={this.props.userId} />} />
                            <Route path = 'characters/update/:characterId'/>
                        <Route path='/journal' element={<JournalLogic  sessionToken={this.props.sessionToken} />} />
                    </Routes>
                </BrowserRouter>

                <div className='Sidebar'>
                    <h1>LINKS</h1>
                    <Link to ="/stories">Stories</Link>
                    <Link to ="/stories/edit">Edit Story</Link>
                    <Link to ="/characters">Characters</Link>
                    <Link to ="/characters/update/:characterId">Update Character</Link>
                    <Link to ="/journal">Journals</Link>
                </div>
            </div>
        )
    }
}

export default Navigation;