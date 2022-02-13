import React from 'react';
import APIURL from '../../../helpers/environment'
interface characterProps {
    sessionToken: string | null
    storyId: string
}

interface characterVars {
    firstname: string,
    lastname: string,
    gender: string ,
    age: string,
    dob: string,
    characters: {}
}

class CharacterLogic extends React.Component<characterProps, characterVars> {
    constructor(props: characterProps) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            gender: '',
            age: '',
            dob: "",
            characters: {}
        }
    }

    createCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log(this.props.storyId)
        fetch(`${APIURL}/characters/create/${this.props.storyId}`, {
            method: "POST",
            body: JSON.stringify({
                characters: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    gender: this.state.gender,
                    age: this.state.age,
                    dob: this.state.dob
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            }),
        })
            .then((res) => res.json())
            .then((CharacterData) => {
                console.log(CharacterData)
            })
            
    }

    //EDIT Character
    editCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/characters/update/:storyId`, {
            method: "PUT",
            body: JSON.stringify({
                Character: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    gender: this.state.gender,
                    age: this.state.age,
                    dob: this.state.dob
                }
            }),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            }),
        })
            .then((res) => res.json())
            .then((CharacterData) => {
                console.log(CharacterData)
            })
    }

    //DELETE A Character

    deleteCharacter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await fetch(`${APIURL}/characters/delete/:storyId`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
    }

    //VIEW ALL Characters
    viewallCharacters = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/characters/view`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": `${this.props.sessionToken}`
            }),
        })

            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({ characters: CharacterData });
            });
    }

    //VIEW One Character
    viewoneCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/characters/view/:storyId`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": `${this.props.sessionToken}`
            }),
        })

            .then((res) => res.json())
            .then((CharacterData) => {
                this.setState({ characters: CharacterData });
            });
    }
    handleFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ firstname: event.target.value })
    }

    handleLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ lastname: event.target.value })
    }

    handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ gender: event.target.value  })
    }

    handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ age:  event.target.value  })
    }

    handleDOB = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ dob: event.target.value })
    }
    render(): React.ReactNode {
        return (
            <div>
                <form>
                    <label>First Name:</label>
                    <input type="text"
                        value={this.state.firstname}
                        onChange={this.handleFirstname}></input>


                    <label>Last Name:</label>
                    <input type="text"
                        value={this.state.lastname}
                        onChange={this.handleLastname}></input>

                    <label>Gender:</label>
                    <input type="text"
                        value={this.state.gender}
                        onChange={this.handleGender}></input>

                    <label>Age:</label>
                    <input type="text"
                        value={this.state.age}
                        onChange={this.handleAge}></input>

                    <label>Date of Birth:</label>
                    <input type="text"
                        value={this.state.dob}
                        onChange={this.handleDOB}></input>

                    <button onClick={(event) => { this.createCharacter(event) }}>Create a New Character</button>

                    <button onClick={(event) => { this.viewallCharacters(event) }}>View All Characters</button>

                </form>

                <button onClick={(event) => { this.viewoneCharacter(event) }}>View Selected Character</button>
                <button onClick={(event) => { this.editCharacter(event) }}>Edit Character</button>
                <button onClick={(event) => { this.deleteCharacter(event) }}>Delete Character</button>
            </div>
        )
    }
}

export default CharacterLogic;
