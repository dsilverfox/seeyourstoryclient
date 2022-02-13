import React from 'react';
import { Card, Button, Modal, Form, Container} from 'react-bootstrap';
import APIURL from '../../../helpers/environment';

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
    viewallFire: boolean
    viewoneFire: boolean
    storyId: string
    story: {id: string, title: string, content: string},
    isOpen: boolean
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
            story: {id: '', title: '', content: ''},
            isOpen: false
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
            //This does not fire.
    }

    //EDIT STORY
    editStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        event.preventDefault();
        await this.setState({ storyId: id })
        fetch(`${APIURL}/story/update/${this.state.storyId}`, {
            method: "PUT",
            body: JSON.stringify({
                editStories: {
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
    }

    //DELETE A STORY

    deleteStory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
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
        fetch(`${ APIURL }/story/view`, {
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
            });
        this.storyMapOne()
        this.setState({viewoneFire: true})
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
                <>
                  <Container className="Allstories">
                    <Card key={index} style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Text>{story.content}
                            </Card.Text>
                            <Button variant="primary" onClick={(event) => this.viewoneStory(event, story.id)}>Select Story</Button>
                        </Card.Body>
                    </Card>
                    </Container>
                </>
            );
        });
    };

    //FUNCTION FOR DISPLAYING ONE STORY
    storyMapOne = () => {
            return (
                    <Card className="viewOne" style={{ width: '15rem' }}>
                        <Card.Body>
                            <Card.Title>{this.state.story.title}</Card.Title>
                            <Card.Text>{this.state.story.content}
                            </Card.Text>
                            <Button variant="primary" onClick={(event) => this.editStoryModal}>Edit Story</Button>
                            <Button variant="primary" onClick={(event) => this.deleteStory(event, this.state.story.id)}>Delete Story</Button>
                        </Card.Body>
                    </Card>
            );
        };
        //FUNCTION FOR EDIT STORY MODAL
    editStoryModal = () => {
            this.setState({isOpen: true})
        const hideModal = () => {
            this.setState({isOpen: false})
            console.log(this.state.storyId)
        }
    return(
    <Modal show = {this.state.isOpen} >
      <Modal.Header>Edit Your Story</Modal.Header>
      <Modal.Body>
          <Form>
                <Form.Label>Title:</Form.Label>
                <input type="text" placeholder="Enter your Story Title"
                    value={this.state.title.value}
                    onChange={this.handleTitle}></input>

                <Form.Label>Content:</Form.Label>
                <input type="text"
                    value={this.state.content.value}
                    onChange={this.handleContent}></input>
          </Form>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={(event) => {hideModal()}}>Cancel Edit</Button>
        <Button variant="primary" onClick={(event) => this.editStory(event, this.state.story.id)}>Save Story</Button>
        </Modal.Footer>
    </Modal>
  );
    };

    // storySelect () => {
    // (this.state.viewoneFire && this.storyMapOne()  ? this.storyMapOne() : this.state.viewallFire && this.storyMapper() )
    // }
 
    render(): React.ReactNode {
        return (
            <div>
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
                    <button onClick={(event) => { this.createStory(event) }}>Create a New Story</button>
                </form>
                <button onClick={(event) => { this.viewallStories(event) }}>View All Stories</button>

                <div>
                    <><div className='cardGroup'>{this.state.viewallFire && this.storyMapper()}</div></>
                    <>{this.state.viewoneFire && this.storyMapOne()}</>
            
                </div>
            </div>
        )
    }
}

export default StoriesLogic;