import React from 'react';
import { Card, Button, Modal, Form, Container } from 'react-bootstrap';
import APIURL from '../../../helpers/environment'



interface characterProps {
    sessionToken: string | null
    storyId: string
}

interface characterVars {
    characterId: string
    firstname: string,
    lastname: string,
    gender: string,
    age: string,
    dob: string,
    characters: {
        firstname: "", 
        lastname: "", 
        gender: "", 
        age: "", 
        dob: "",
        id: ""
    }[]
    character: {
        firstname: string,
        lastname: string,
        gender: string,
        age: string,
        dob: string,
        id: string, 
    }
        viewOneFire: boolean
        viewAllFire: boolean
        isOpen: boolean
    }

class CharacterLogic extends React.Component<characterProps, characterVars> {
    constructor(props: characterProps) {
        super(props)

        this.state = {
            characterId: "",
            firstname: "",
            lastname: "",
            gender: "",
            age: "",
            dob: "",
            characters: [{ firstname: "", lastname: "", gender: "", age: "", dob: "", id:""}],
            character: {firstname: "", lastname: "", gender: "", age: "", dob: "", id:""},
            viewOneFire: false,
            viewAllFire: false,
            isOpen: false,
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
                this.setState({ characterId: CharacterData.id })
            })
            this.viewallCharacters(event);

    }

    //EDIT Character
    editCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        event.preventDefault();
        fetch(`${APIURL}/characters/update/${this.state.characterId}`, {
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
                this.setState({ characterId: CharacterData.id })
            })
            this.viewallCharacters(event)
            ;
            this.setState({isOpen: false})
    }

    //DELETE A Character

    deleteCharacter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        event.preventDefault();
        await this.setState({characterId: id})
        await fetch(`${APIURL}/characters/delete/${this.state.characterId}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        console.log("Character Deleted")
        console.log(this.state.characters)
        this.viewallCharacters(event);
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
                console.log(this.state.characters)
            });
        this.charactersMapper()
        this.setState({ viewAllFire: true })
    }

    //VIEW One Character
    viewoneCharacter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
        event.preventDefault();
        await this.setState({characterId: id})
        fetch(`${APIURL}/characters/view/${this.state.characterId}`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": `${this.props.sessionToken}`
            }),
        })

            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then((CharacterData) => {
                console.log("Character data for set state", CharacterData)
                this.setState({ character: CharacterData });
                this.setState({ characterId: CharacterData.id})
                
            }); 
            this.setState({viewOneFire: true})
            console.log("FIRE STATE", this.state.viewOneFire)
            this.characterMapOne()
            console.log('Character State', this.state.character)
            console.log("Character Id State", this.state.characterId)
    }

    //HANDLER FUNCTIONS
    handleFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ firstname: event.target.value })
    }

    handleLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ lastname: event.target.value })
    }

    handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ gender: event.target.value })
    }

    handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ age: event.target.value })
    }

    handleDOB = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ dob: event.target.value })
    }

    //DISPLAYS

    //Display All Characters
    charactersMapper = () => {
        return this.state.characters.map((character, index) => {
            return (
                <>
                    <Container className="Allstories">
                        <Card key={index}>
                            <Card.Body>
                                <Card.Title>{character.firstname} {character.lastname}</Card.Title>
                                <Card.Text>
                                    Gender: {character.gender}
                                    <br />
                                    Age: {character.age}
                                    <br />
                                    Date of Birth{character.dob}
                                </Card.Text>
                                <Button variant="primary" onClick={(event) => this.viewoneCharacter(event, character.id)}>Select Character</Button>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            );
        });
    };

    //DISPLAY ONE CHARACTER
    characterMapOne = () => {
        return (
            <Card className="viewOne">
                <Card.Body>
                    <Card.Title>{this.state.character.firstname} {this.state.character.lastname}</Card.Title>
                    <Card.Text>{this.state.character.gender}
                    <br/>
                    {this.state.character.age}
                    <br/>
                    {this.state.character.dob}
                    </Card.Text>
                    <Button variant="primary" onClick={(event) => this.setState({ isOpen: true })}>Edit Character</Button>
                    <Button variant="primary" onClick={(event) => this.deleteCharacter(event, this.state.character.id)}>Delete Character</Button>
                    {/* <Button variant="primary" onClick={(event) => this.displayCharacter()}>Characters</Button> */}
                </Card.Body>
            </Card>
        );
    };

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


                {/* <button onClick={(event) => { this.editCharacter(event) }}>Edit Character</button>  */}


                {/* VIEW ALL CHARACTERS */}
                <div>
                <>{this.state.viewAllFire && this.charactersMapper()}</>
                </div>
                
                {/* VIEW ONE CHARACTER */}
                <>{this.state.viewOneFire && this.characterMapOne()}</>
                
                {/* EDIT CHARACTER */}

                <>
                    <Modal show={this.state.isOpen} >
                        <Modal.Header>Edit Your Character</Modal.Header>
                        <Modal.Body>
                            <Form>
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
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={(event) => this.setState({ isOpen: false })}>Cancel Edit</Button>
                            <Button variant="primary" onClick={(event) => this.editCharacter(event, this.state.characterId)}>Save Character</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        )
    }
}

export default CharacterLogic;
