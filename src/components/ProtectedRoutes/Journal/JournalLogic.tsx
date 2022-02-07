import React from 'react';
import { tokenState } from '../../../App';

interface journalProps extends tokenState {
    title: { value: string; }
    content: { value: string; }
}

class JournalLogic extends React.Component<tokenState, journalProps> {
    constructor(props: journalProps) {
        super(props)

        this.state = {
            title: { value: '' },
            content: { value: '' },
            sessionToken: " ",
            token: " ",
            updateToken: " ",
        }
    }

    createjournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/journal/create", {
            method: "POST",
            body: JSON.stringify({
                journal: {
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
            .then((journalData) => {
                this.setState({ title: this.state.title})
                this.setState({ content: this.state.content })
            })
    }

    //EDIT journal
    editjournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/journal/update/:journalId", {
            method: "PUT",
            body: JSON.stringify({
                journal: {
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
            .then((journalData) => {
                this.setState({ title: this.state.title })
                this.setState({ content: this.state.content })
            })
    }

    //DELETE A journal

    deletejournal = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("http://localhost:3000/journal/delete/:journalId", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            })
        })
    }
    //VIEW ONE Journal
    viewonejournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/journal/view/:journalId", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })

            .then((res) => res.json())
            .then((journalData) => {
                this.setState({ title: this.state.title })
                this.setState({ content: this.state.content })
            });
    }
    handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: { value: event.target.value } })
    }

    handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ content: { value: event.target.value } })
    }
    render() {
        return (
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
                    <button onClick={(event) => { this.createjournal(event) }}>Create a New journal</button>
                </form>

                <button onClick={(event) => { this.viewonejournal(event) }}>View Selected journal</button>
                <button onClick={(event) => { this.editjournal(event) }}>Edit journal</button>
                <button onClick={(event) => { this.deletejournal(event) }}>Delete journal</button>
            </div>
        )
    }
}

export default JournalLogic;