import React from 'react';
import { Card, Button } from 'react-bootstrap'

interface storyProps {
    sessionToken: string | null
}

interface storyVars {
    title: { value: string; }
    content: { value: string; }
    stories: {
        id: string,
        title: string,
        content: string
    }[]
}

class StoriesLogic extends React.Component<storyProps, storyVars> {
    constructor(props: storyProps) {
        super(props)

        this.state = {
            title: { value: '' },
            content: { value: '' },
            stories: [{id:'', title:'', content:''}]
        }

    }

    createStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("story title:", this.state.title.value)
        console.log("story content:", this.state.content.value)
        console.log("Session token on Story Create", this.props.sessionToken)
        fetch("https://seeyourstoryserver.herokuapp.com/story/create", {
            method: "POST",
            body: JSON.stringify({
                stories: {
                    title: this.state.title.value,
                    content: this.state.content.value,
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            }),
        })
            .then((res) => res.json())
            .then((storyData) => {
                console.log(storyData)
            })
            .catch(error => {
                console.log(error)
            });
    }

    //EDIT STORY
    editStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/story/update/:storyId", {
            method: "PUT",
            body: JSON.stringify({
                stories: {
                    title: this.state.title.value,
                    content: this.state.content.value,
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            }),
        })
            .then((res) => res.json())
            .then((storyData) => {
                this.setState({ title: this.state.title })
                this.setState({ content: this.state.content })
            })
    }

    //DELETE A STORY

    deleteStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("https://seeyourstoryserver.herokuapp.com/story/delete/:storyId", {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
    }

    //VIEW ALL STORIES
    viewallStories = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/story/view", {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            }),
        })
            .then((res) => res.json())
            .then((storyData) => {
                this.setState({ stories: storyData });
                console.log(this.state.stories);
                console.log(this.state.stories[1].id)
            });
        this.storyMapper();
    }

    //VIEW ONE STORIES
    viewoneStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/story/view/:storyId", {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            }),
        })

            .then((res) => res.json())
            .then((storyData) => {
                this.setState({ stories: storyData });
            });
    }
    handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: { value: event.target.value } })
    }

    handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: { value: event.target.value } })
    }

    storyMapper = () => {
        return this.state.stories.map((story, index) => {
            return (
                <>
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{this.state.stories.title}</Card.Title>
                            <Card.Subtitle>Story ID: {this.state.stories.id}</Card.Subtitle>
                            <Card.Text>{this.state.stories.content}
                            </Card.Text>
                            <Button variant="primary" onClick={(event) => this.viewoneStory(event)}>Select Story</Button>
                        </Card.Body>
                    </Card>
                </>
            );
        });
    };

    render() {

        return (
            <div>

                <form>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter your Story Title"
                        value={this.state.title.value}
                        onChange={this.handleTitle}></input>


                    <label>Content:</label>
                    <input type="text"
                        value={this.state.content.value}
                        onChange={this.handleContent}></input>
                    <button onClick={(event) => { this.createStory(event) }}>Create a New Story</button>
                </form>

                <button onClick={(event) => { this.viewallStories(event) }}>View All Stories</button>
                <>{this.storyMapper()}</>
                {/* <div>
                    {this.storyMapper()}
                </div> */}
                {/* <button onClick={(event) => { this.editStory(event) }}>Edit Story</button> */}
                {/* <button onClick={(event) => { this.deleteStory(event) }}>Delete Story</button> */}
            </div>
        )
    }
}

export default StoriesLogic;