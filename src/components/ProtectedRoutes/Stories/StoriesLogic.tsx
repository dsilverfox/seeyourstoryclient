import React from 'react';
import { tokenState } from '../../../App';
const Radium = require('radium');

interface storyProps extends tokenState {
    title: string,
    content: string
    stories: {}
}

class StoriesLogic extends React.Component <tokenState, storyProps> {
    constructor(props: storyProps){
        super(props)

        this.state = {
            title: '',
            content: '',
            sessionToken: " ",
            token: " ",
            updateToken: " ",
            stories: {}
        }
    }

    createStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/story/create", {
            method: "POST",
            body: JSON.stringify({
                story: {
                    title: this.state.title,
                    content: this.state.content,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }),
        })
        .then((res) => res.json())
        .then((storyData) => {
            this.setState({title: this.state.title})
            this.setState({content: this.state.content})
        })
    }

    //EDIT STORY
    editStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/story/update/:storyId", {
            method: "PUT",
            body: JSON.stringify({
                story: {
                    title: this.state.title,
                    content: this.state.content,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
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
        await fetch("http://localhost:3000/story/delete/:storyId", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            })
        })
    }

    //VIEW ALL STORIES
    viewallStories = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/story/view", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })

            .then((res) => res.json())
            .then((storyData) => {
               this.setState({stories: storyData});
            });
    }

    //VIEW ALL STORIES
    viewoneStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/story/view/:storyId", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })

            .then((res) => res.json())
            .then((storyData) => {
                this.setState({ stories: storyData });
            });
    }

    render() {
        return(
            <div>
                <button onClick={(event) => { this.createStory(event) }}>Create a New Story</button>
                <button onClick={(event) => { this.viewoneStory(event) }}>View Selected Story</button>
                <button onClick={(event) => { this.viewallStories(event) }}>View All Stories</button>
                <button onClick={(event) => { this.editStory(event) }}>Edit Story</button>
                <button onClick={(event) => { this.deleteStory(event) }}>Delete Story</button>
            </div>
        )
    }
}

export default Radium(StoriesLogic);