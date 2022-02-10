import React from 'react';

interface CharacterDisplayProps {
    stories: []
}

class CharactersDisplay extends React.Component<{}, CharacterDisplayProps> {
    constructor(props: CharacterDisplayProps) {
        super(props)
    }
    render() {
        return (
            <div>
                I AM THE CharactersDisplay!
                I will hold the New Character button and the display of the cards of existing characters.
                Existing characters will have the JournalDisplay ternary.
            </div>
        )
    }
}

export default CharactersDisplay;