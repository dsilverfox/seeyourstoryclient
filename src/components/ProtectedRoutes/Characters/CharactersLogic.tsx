import React from 'react';
import { Card, Button, Modal, Form, Container } from 'react-bootstrap';
import APIURL from '../../../helpers/environment'



interface characterProps {
    sessionToken: string | null
    userId: string
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
        firstname: string,
        lastname: string,
        gender: string,
        age: string,
        dob: string,
        id: string
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
            characters: [{ firstname: "", lastname: "", gender: "", age: "", dob: "", id: "" }],
            character: { firstname: "", lastname: "", gender: "", age: "", dob: "", id: "" },
            viewOneFire: false,
            viewAllFire: false,
            isOpen: false,
        }
        this.deleteCharacter=this.deleteCharacter.bind(this)
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
        this.viewallCharacters();

    }

    //EDIT Character
    editCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        console.log("Edit Beginning")
        event.preventDefault();
        console.log(id)
        fetch(`${APIURL}/characters/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                character: {
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
                console.log("Edit Done")
            })
            .catch(err =>{
                console.log("Error:", err)
            })  
        this.viewallCharacters();
        this.setState({ isOpen: false })
    }

    //DELETE A Character

    async deleteCharacter () {

        console.log(this.state.character.id)
        await fetch(`${APIURL}/characters/delete/${this.state.character.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        console.log(this.state.characters)
        this.viewallCharacters();
        this.setState({viewOneFire: false})
    }

    //VIEW ALL Characters
    viewallCharacters = () => {

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
    viewoneCharacter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        event.preventDefault();
        await this.setState({ characterId: id })
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
                //add other setStates as necessary once anything actually sets in state.
                this.setState({ characterId: CharacterData.id })
                this.setState({ character: CharacterData })
            });

        this.setState({ viewOneFire: true })
        console.log("FIRE STATE", this.state.viewOneFire)
        console.log('Character FN State', this.state.character.firstname)
        console.log("Character Id State", this.state.character.id)
        // this.characterMapOne()
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
                <Container key={character.id} className="Allstories">
                    <Card >
                        <Card.Body>
                            <Card.Title>{character.firstname} {character.lastname}</Card.Title>
                            <Card.Text>
                                Gender: {character.gender}
                                <br />
                                Age: {character.age}
                                <br />
                                Date of Birth{character.dob}
                            </Card.Text>
                            <Button variant="outline-light" onClick={(event) => this.viewoneCharacter(event, character.id)}>Select Character</Button>
                        </Card.Body>
                    </Card>
                </Container>
            );
        });
    };

    //DISPLAY ONE CHARACTER
    characterMapOne() {
        return (
            <Card className="viewOne">
                <Card.Body>
                    <Card.Title>{this.state.character.firstname} {this.state.character.lastname}</Card.Title>
                    <Card.Text>{this.state.character.gender}
                        <br />
                        {this.state.character.age}
                        <br />
                        {this.state.character.dob}
                    </Card.Text>
                    <Button variant="outline-light" onClick={(event) => this.setState({ isOpen: true })}>Edit Character</Button>
                    <Button variant="outline-light" onClick={this.deleteCharacter}>Delete Character</Button>
                    {/* <Button onClick={(event) => this.setState({ isOpen: false })}>Cancel</Button> */}
                    {/* <Button onClick={(event) => this.displayCharacter()}>Characters</Button> */}
                </Card.Body>
            </Card>
        );
    };

    render(): React.ReactNode {
        return (
            <div className="characterInput">
                <h2>Populate Your World</h2>
                <form>
                    <label>First Name:</label>
                    <input type="text"
                        value={this.state.firstname}
                        onChange={this.handleFirstname}></input>
                    <br/>

                    <label>Last Name:</label>
                    <input type="text"
                        value={this.state.lastname}
                        onChange={this.handleLastname}></input>
                    <br/>

                    <label>Gender:</label>
                    <input className='gender' type="text"
                        value={this.state.gender}
                        onChange={this.handleGender}></input>
                    <br/>

                    <label>Age:</label>
                    <input className='age' type="text"
                        value={this.state.age}
                        onChange={this.handleAge}></input>
                    <br/>

                    <label>Date of Birth:</label>
                    <input type="text"
                        value={this.state.dob}
                        onChange={this.handleDOB}></input>
                    <br/>
                    <Button variant="outline-light" onClick={(event) => { this.createCharacter(event) }}>Create a New Character</Button>

                    <Button variant="outline-light" type="button" onClick={this.viewallCharacters}>View All Characters</Button>
                </form>


                {/* <button onClick={(event) => { this.editCharacter(event) }}>Edit Character</button>  */}


                {/* VIEW ALL CHARACTERS */}
                <div className='cardGroup'>
                    <>{this.state.viewAllFire && this.charactersMapper()}</>
                </div>

                {/* VIEW ONE CHARACTER */}
                <>{this.state.viewOneFire && this.characterMapOne()}</>

                {/* EDIT CHARACTER */}

                <>
                    <Modal show={this.state.isOpen} className="editModal">
                        <Modal.Header>Edit Your Character</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <label>First Name:</label>
                                <input type="text"
                                    value={this.state.firstname}
                                    onChange={this.handleFirstname}></input>
                                <br />
                                <label>Last Name:</label>
                                <input type="text"
                                    value={this.state.lastname}
                                    onChange={this.handleLastname}></input>

                                <label>Gender:</label>
                                <input type="text"
                                    value={this.state.gender}
                                    onChange={this.handleGender}></input>
                                <br />
                                <label>Age:</label>
                                <input type="text"
                                    value={this.state.age}
                                    onChange={this.handleAge}></input>
                                <br />
                                <label>D.O.B:</label>
                                <input type="text"
                                    value={this.state.dob}
                                    onChange={this.handleDOB}></input>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={(event) => this.setState({ isOpen: false })}>Cancel Edit</Button>
                            <Button variant="outline-dark" onClick={(event) => this.editCharacter(event, this.state.character.id)}>Save Character</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        )
    }
}

export default CharacterLogic;
