import React from 'react';
import { Card, Button } from 'react-bootstrap'

interface storyProps {
    stories: []
    title: { value: string; }
    content: { value: string; }
}
class StoriesDisplay extends React.Component<storyProps, {}> {
    constructor(props: storyProps) {
        super(props)
    }

    storyMapper = () => {
        return this.props.stories.map((story, index) => {
            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>{this.props.content}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            );
        });
    };
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