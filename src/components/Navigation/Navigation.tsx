import React from 'react';
import {
    Link
} from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
                <div className='Sidebar'>
                    <h1>LINKS</h1>
                    <Link to ="/stories">Stories</Link>
                    <Link to ="/stories/edit">Edit Story</Link>
                    <Link to ="/characters">Characters</Link>
                    <Link to ="/characters/update/:characterId">Update Character</Link>
                    <Link to ="/journal">Journals</Link>
                </div>
        )
    }
}

export default Navigation;