import React from 'react';
import { tokenState } from '../../../App';
const Radium = require('radium');

interface journalProps extends tokenState {
    journal: {title: string, content: string}
}

class JournalLogic extends React.Component<tokenState, journalProps> {
    constructor(props: journalProps) {
        super(props)

        this.state = {
            journal: {title: " ", content: " "},
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
                    title: this.state.journal.title,
                    content: this.state.journal.content,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }),
        })
            .then((res) => res.json())
            .then((journalData) => {
                this.setState({ journal: (title, content) })
            })
    }

    //EDIT journal
    editjournal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/journal/update/:journalId", {
            method: "PUT",
            body: JSON.stringify({
                journal: {
                    title: this.state.journal.title,
                    content: this.state.journal.content,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }),
        })
            .then((res) => res.json())
            .then((journalData) => {
                this.setState({ journal: (title, content)})
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
                this.setState({ journal: journalData });
            });
    }

    render() {
        return (
            <div>
                <button onClick={(event) => { this.createjournal(event) }}>Create a New journal</button>
                <button onClick={(event) => { this.viewonejournal(event) }}>View Selected journal</button>
                <button onClick={(event) => { this.editjournal(event) }}>Edit journal</button>
                <button onClick={(event) => { this.deletejournal(event) }}>Delete journal</button>
            </div>
        )
    }
}

export default Radium(JournalLogic);