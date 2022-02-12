import React from 'react';
import APIURL from '../../../helpers/environment'
interface characterProps {
    sessionToken: string | null
}

interface characterVars {
    firstname: { value: string },
    lastname: { value: string },
    gender: { value: string },
    age: { value: string },
    dob: string | Date,
    characters: {}
}

class CharacterLogic extends React.Component<characterProps, characterVars> {
    constructor(props: characterProps) {
        super(props)

        this.state = {
            firstname: { value: '' },
            lastname: { value: '' },
            gender: { value: '' },
            age: { value: '' },
            dob: "",
            characters: {}
        }
    }

    createCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/Character/create`, {
            method: "POST",
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
                this.setState({ firstname: this.state.firstname })
                this.setState({ lastname: this.state.lastname })
                this.setState({ gender: this.state.gender })
                this.setState({ age: this.state.age })
                this.setState({ dob: this.state.dob })
            })
    }

    //EDIT Character
    editCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/Character/update/:CharacterId`, {
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
        await fetch(`${APIURL}/Character/delete/:CharacterId`, {
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
        fetch(`${APIURL}/Character/view`, {
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

    //VIEW ALL Characters
    viewoneCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fetch(`${APIURL}/Character/view/:characterId`, {
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
        this.setState({ firstname: { value: event.target.value } })
    }

    handleLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ lastname: { value: event.target.value } })
    }

    handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ gender: { value: event.target.value } })
    }

    handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ age: { value: event.target.value } })
    }

    handleDOB = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ dob: event.target.value})
    }
    render() {
        return (
            <div>
                <form>
                    <label>First Name:</label>
                    <input type="text" placeholder="Enter your Story Title"
                        value={this.state.firstname.value}
                        onChange={this.handleFirstname}></input>


                    <label>Last Name:</label>
                    <input type="text"
                        value={this.state.lastname.value}
                        onChange={this.handleLastname}></input>

                    <label>Gender:</label>
                    <input type="text"
                        value={this.state.gender.value}
                        onChange={this.handleGender}></input>

                    <label>Age:</label>
                    <input type="text"
                        value={this.state.age.value}
                        onChange={this.handleAge}></input>

                    <label>Date of Birth:</label>
                    <input type="text"
                        value={this.state.age.value}
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
