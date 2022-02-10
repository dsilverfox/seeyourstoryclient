import React from 'react';

interface storyProps {
    stories: object
}
class StoriesDisplay extends React.Component<{}, storyProps> {
    constructor(props: storyProps) {
        super(props)
    }
    render() {
        return (
            <div>
                I AM THE StoriesDisplay!
                I will display the stories that the user has.
                Selecting a story will display characters.
            </div>
        )
    }
}

export default StoriesDisplay;