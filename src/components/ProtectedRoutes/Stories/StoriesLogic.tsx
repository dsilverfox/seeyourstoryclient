import React from 'react';
import { Card, Button, Modal, Form, Container } from 'react-bootstrap';
import APIURL from '../../../helpers/environment';
import CharactersLogic from "../Characters/CharactersLogic"
import {Link} from 'react-router-dom';

interface storyProps {
    sessionToken: string | null
    userId: string
    storyId: string
    setStoryId: (i: string) => void
}

interface storyVars {
    title: { value: string; }
    content: { value: string; }
    stories: {
        id: string,
        title: string,
        content: string
    }[]
    viewallFire: boolean
    viewoneFire: boolean
    storyId: string
    story: { id: string, title: string, content: string },
    isOpen: boolean
    createFire: boolean
}

class StoriesLogic extends React.Component<storyProps, storyVars> {
    constructor(props: storyProps) {
        super(props)

        this.state = {
            title: { value: '' },
            content: { value: '' },
            stories: [{ id: '', title: '', content: '' }],
            viewallFire: false,
            viewoneFire: false,
            storyId: '',
            story: { id: '', title: '', content: '' },
            isOpen: false,
            createFire: true,
        }

    }

    createStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // event.preventDefault();
        console.log("story title:", this.state.title.value)
        console.log("story content:", this.state.content.value)
        console.log("Session token on Story Create", this.props.sessionToken)
        fetch(`${APIURL}/story/create`, {
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
        this.viewallStories(event);
    }

    //EDIT STORY
    editStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        event.preventDefault();
        // await this.setState({ storyId: id })
        fetch(`${APIURL}/story/update/${this.state.storyId}`, {
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
            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then((storyData) => {
                this.setState({ title: this.state.title })
                this.setState({ content: this.state.content })
                this.setState({ storyId: storyData.id })
            })
        this.viewallStories(event);
        this.setState({ isOpen: false })
    }

    //DELETE A STORY

    deleteStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        // event.preventDefault();
        await this.setState({ storyId: id })
        await fetch(`${APIURL}/story/delete/${this.state.storyId}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        console.log("Story Deleted")
        console.log(this.state.stories)
        this.viewallStories(event);
    }

    //VIEW ALL STORIES
    viewallStories = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/story/view`, {
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
            });
        this.storyMapper();
        this.setState({ viewallFire: true });
    }

    //VIEW ONE STORY
    viewoneStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        event.preventDefault();
        await this.setState({ storyId: id })
        await fetch(`${APIURL}/story/view/${this.state.storyId}`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            }),

        })
            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then((storyData) => {
                this.setState({ story: storyData });
                // console.log(storyData)
                this.props.setStoryId(storyData.id)
            });
        this.storyMapOne()
        this.setState({ viewoneFire: true })
        this.setState({ createFire: true })
        console.log('STORY', this.state.story)
    }

    //INPUT BASED SETSTATE
    handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: { value: event.target.value } })
    }

    handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: { value: event.target.value } })
    }

    // VIEW FUNCTIONS: Display ALL stories, Display ONE story, Edit story
    //ARRAY MAP FOR DISPLAYING ALL STORIES
    storyMapper = () => {
        return this.state.stories.map((story, index) => {
            return (
                <Container key={story.id} className="Allstories">
                        <Card >
                            <Card.Body>
                                <Card.Title>{story.title}</Card.Title>
                                <Card.Text id="story">{story.content}
                                </Card.Text>
                                <Button variant="outline-light" onClick={(event) => this.viewoneStory(event, story.id)}>Select Story</Button>
                            </Card.Body>
                        </Card>
                    </Container>
            );
        });
    };

    //FUNCTION FOR DISPLAYING ONE STORY
    storyMapOne = () => {
        return (
            <Card className="viewOne">
                <Card.Body>
                    <Card.Title>{this.state.story.title}</Card.Title>
                    <Card.Text>{this.state.story.content}
                    </Card.Text>
                    <Button variant="outline-light"onClick={(event) => this.setState({ isOpen: true })}>Edit Story</Button>
                    <Button variant="outline-light" onClick={(event) => this.deleteStory(event, this.state.story.id)}>Delete Story</Button>
                    <Link to ="/characters"><Button variant="outline-light" type="button">Characters</Button></Link>
                </Card.Body>
            </Card>
        );
    };

    displayCharacter = () => {
        return (this.state.createFire === true ? <CharactersLogic sessionToken={this.props.sessionToken} storyId={this.state.storyId} userId={this.props.userId}/> : null)
    }

    // handleCharacter = () => {
    //     this.setState({ storyId: this.state.storyId })
    //     this.setState({ createFire: true })
    // }



    render(): React.ReactNode {
        return (
            <div className="storiesInput">
                <h2>Write Your World</h2>
                {/* Create a story. */}
                <form>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter your Story Title"
                        value={this.state.title.value}
                        onChange={this.handleTitle}></input>


                    <label>Content:</label>
                    <input type="text"
                        value={this.state.content.value}
                        onChange={this.handleContent}></input>
                    <Button variant="outline-light" onClick={(event) => { this.createStory(event) }}>Create a New Story</Button>
                    <Button variant="outline-light" onClick={(event) => { this.viewallStories(event) }}>View All Stories</Button>
                </form>
                

                {/* View All Stories*/}
                <div className='cardGroup'>{this.state.viewallFire && this.storyMapper()}</div>

                {/* View One Story */}
                <>{this.state.viewoneFire && this.storyMapOne()}</>

                {/* Edit Story */}
                <>
                    <Modal show={this.state.isOpen} className="editModal" >
                        <Modal.Header>Edit Your Story</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Label>Title:</Form.Label>
                                <input type="text" placeholder="Enter your Story Title"
                                    value={this.state.title.value}
                                    onChange={this.handleTitle}></input>
                                <br/>
                                <Form.Label>Content:</Form.Label>
                                <input type="text"
                                    value={this.state.content.value}
                                    onChange={this.handleContent}></input>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={(event) => this.setState({ isOpen: false })}>Cancel Edit</Button>
                            <Button variant="outline-dark" onClick={(event) => this.editStory(event, this.state.story.id)}>Save Story</Button>
                        </Modal.Footer>
                    </Modal>
                </>

            </div>
        )
    }
}

export default StoriesLogic;