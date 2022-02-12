import { useState, useEffect, ReactElement } from 'react';


function PasswordValidate(): ReactElement {
    const [password, setPassword] = useState({
        firstPassword: '',
        secondPassword: ''
    })
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [match, setMatch] = useState(false);
    const [requiredLength, setRequiredLength] = useState(8)

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setPassword({
            ...password,
            [name]: value
        })
    }

    useEffect(() => {
        setValidLength(password.firstPassword.length >= requiredLength ? true : false);
        setUpperCase(password.firstPassword.toLowerCase() !== password.firstPassword);
        setLowerCase(password.firstPassword.toUpperCase() !== password.firstPassword);
        setHasNumber(/\d/.test(password.firstPassword));
        setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword)
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password.firstPassword));

    }, [password, requiredLength]);

    return (
        <div >
            <label htmlFor="firstPassword">First Password</label>
            <br />
            <input onChange={inputChange} name="firstPassword" type='text' />
            <br />
            <label htmlFor="secondPassword">Second Password</label>
            <br />
            <input onChange={inputChange} name="secondPassword" type='text' />
            <br />
            <br />
            <ul>
                <li>
                    Valid Length: {validLength ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                    Has a Number: {hasNumber ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                    UpperCase: {upperCase ? <span>True</span> : <span>False</span>}
                </li>
                <li>
                    LowerCase: {lowerCase ? <span>True</span> : <span>False</span>}
                </li>
                <li>Match: {match ? <span>True</span> : <span>False</span>}</li>
                <li>
                    Special Character: {specialChar ? <span>True</span> : <span>False</span>}
                </li>
            </ul>
        </div>
    );
}

export default PasswordValidate;