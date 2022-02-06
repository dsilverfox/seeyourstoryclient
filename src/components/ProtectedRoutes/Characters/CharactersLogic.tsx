import React from 'react';
import { tokenState } from '../../../App';
const Radium = require('radium');

interface characterProps extends tokenState {
    firstname: string,
    lastname: string,
    gender: string,
    age: number,
    // dob: Date,
    characters: {}
}

class CharacterLogic extends React.Component<tokenState, characterProps> {
    constructor(props: characterProps) {
        super(props)

        this.state = {
            firstname: " ",
            lastname: " ",
            gender: " ",
            age: 0,
            // dob: 01/01/1901,
            characters: {},
            sessionToken: " ",
            token: " ",
            updateToken: " ",
        }
    }

    createCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/Character/create", {
            method: "POST",
            body: JSON.stringify({
                Character: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    gender: this.state.gender,
                    age: this.state.age,
                    // dob: this.state.dob
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }),
        })
            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({firstname: this.state.firstname})
                this.setState({ lastname: this.state.lastname })
                this.setState({ gender: this.state.gender })
                this.setState({ age: this.state.age })
                // this.setState({ dob: this.state.dob })
            })
    }

    //EDIT Character
    editCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/Character/update/:CharacterId", {
            method: "PUT",
            body: JSON.stringify({
                Character: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    gender: this.state.gender,
                    age: this.state.age,
                    // dob: this.state.dob
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            }),
        })
            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({ firstname: this.state.firstname })
                this.setState({ lastname: this.state.lastname })
                this.setState({ gender: this.state.gender })
                this.setState({ age: this.state.age })
                // this.setState({ dob: this.state.dob })
            })
    }

    //DELETE A Character

    deleteCharacter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch("http://localhost:3000/Character/delete/:CharacterId", {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.token}`
            })
        })
    }

    //VIEW ALL Characters
    viewallCharacters = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/Character/view", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })

            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({ characters: CharacterData });
            });
    }

    //VIEW ALL Characters
    viewoneCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch("http://localhost:3000/Character/view/:characterId", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })

            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({ characters: CharacterData });
            });
    }

    render() {
        return (
            <div>
                <button onClick={(event) => { this.createCharacter(event) }}>Create a New Character</button>
                <button onClick={(event) => { this.viewoneCharacter(event) }}>View Selected Character</button>
                <button onClick={(event) => { this.viewallCharacters(event) }}>View All Characters</button>
                <button onClick={(event) => { this.editCharacter(event) }}>Edit Character</button>
                <button onClick={(event) => { this.deleteCharacter(event) }}>Delete Character</button>
            </div>
        )
    }
}

export default Radium(CharacterLogic);