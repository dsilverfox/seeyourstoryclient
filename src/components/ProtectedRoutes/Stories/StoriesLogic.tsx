import React from 'react';
import { tokenState } from '../../../App';
const Radium = require('radium');

interface storyProps extends tokenState {
    title: {value: string;}
    content: {value: string;}
    stories: {}[]
}

class StoriesLogic extends React.Component <tokenState, storyProps> {
    constructor(props: storyProps){
        super(props)

        this.state = {
            title: {value:''},
            content: {value: ''},
            sessionToken: " ",
            token: " ",
            updateToken: " ",
            stories: [{}]
        }
    }

    createStory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("https://seeyourstoryserver.herokuapp.com/story/create", {
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
        fetch("https://seeyourstoryserver.herokuapp.com/story/update/:storyId", {
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
        await fetch("https://seeyourstoryserver.herokuapp.com/story/delete/:storyId", {
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
        fetch("https://seeyourstoryserver.herokuapp.com/story/view", {
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
        fetch("https://seeyourstoryserver.herokuapp.com/story/view/:storyId", {
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
    handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: { value: event.target.value } })
    }

    handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: { value: event.target.value } })
    }

    render() {
        return(
            <div>

                <form>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter your Story Title"
                        value={this.state.title.value}
                        onChange={this.handleTitle}></input>


                    <label>Content:</label>
                    <input type="password"
                        value={this.state.content.value}
                        onChange={this.handleContent}></input>
                    <button onClick={(event) => { this.createStory(event) }}>Create a New Story</button>
                </form>

                <button onClick={(event) => { this.viewoneStory(event) }}>View Selected Story</button>
                <button onClick={(event) => { this.viewallStories(event) }}>View All Stories</button>
                <button onClick={(event) => { this.editStory(event) }}>Edit Story</button>
                <button onClick={(event) => { this.deleteStory(event) }}>Delete Story</button>
            </div>
        )
    }
}

export default Radium(StoriesLogic);