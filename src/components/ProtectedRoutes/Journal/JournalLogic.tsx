import React from 'react';
import APIURL from '../../../helpers/environment';

interface journalProps{
    sessionToken: string
}

interface journalVars {
    title: { value: string; }
    content: { value: string; }
}

class JournalLogic extends React.Component<journalProps, journalVars> {
    constructor(props: journalProps) {
        super(props)

        this.state = {
            title: { value: '' },
            content: { value: '' },
        }
    }

    createjournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${ APIURL }/journal/create`, {
            method: "POST",
            body: JSON.stringify({
                journal: {
                    title: this.state.title,
                    content: this.state.content,
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
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
        fetch(`${ APIURL }/journal/update/:journalId`, {
            method: "PUT",
            body: JSON.stringify({
                journal: {
                    title: this.state.title,
                    content: this.state.content,
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
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
        await fetch("https://seeyourstoryserver.herokuapp.com/journal/delete/:journalId", {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            })
        })
    }
    //VIEW ONE Journal
    viewonejournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/journal/view/:journalId`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
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