import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; // navegar de um componente pra outro sem ter botão
import { auth } from '../../firebase.js'

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState(null);
    
    const hist = useHistory();

    async function signInWithEmailAndPasswordHandler(event: FormEvent) {
        event.preventDefault();
        try {
            await auth.sendPasswordResetEmail(email)
            alert("As instruções para recuperação da senha foram enviados para seu email")
            hist.push('/login');    
        }
        catch(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/invalid-email') {
                alert('Email inválido');
            } else {
                alert(errorMessage);
            }
        }
    } 
            
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        if(name === 'email') {
            setEmail(value);
        }
        else if(name === 'password'){
          setPassword(value);
        }
    }

    return (
        <div id="forgot-password-page">
            <header>
                <Link to="/login">
                    <FiArrowLeft />
                    Login
                </Link>
            </header>

            <form onSubmit={signInWithEmailAndPasswordHandler}>
                <fieldset>
                    <div className="field">
                        <label htmlFor="email">Digite seu e-mail:</label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                
                    <div className="field-group">
                        <div className="field">
                            <button type="submit">
                                Recuperar senha
                            </button>
                        </div>
                    </div>
                </fieldset>
                
            </form>
        </div>
    );
}

export default SignIn;