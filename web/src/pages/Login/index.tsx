import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; // navegar de um componente pra outro sem ter botão
import { auth } from '../../firebase.js'

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hist = useHistory();
    
    async function signInWithEmailAndPasswordHandler(event: FormEvent) {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password)
            alert("Login Efetuado com sucesso")
            hist.push('/');    
        }
        catch(error) {
            alert('Usuário ou email inválido. Verifique e tente novamente');
        }
    } 

    function doRegister() {

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
        <div id="login-page">
            <header>
                <Link to="/">
                    <FiArrowLeft />
                    Home
                </Link>
            </header>

            <form onSubmit={signInWithEmailAndPasswordHandler}>
                <fieldset>
                    <div className="field">
                        <label htmlFor="email">E-mail:</label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <button type="submit">
                                Entrar
                        </button>
                    </div>
                    
                    <div className="field-group">
                        <div className="field">
                            <Link to="/newmember">
                                <button type="button">
                                    Cadastrar
                                </button>
                            </Link>
                        </div>
                        <div className="field">
                            <Link to="/forgot-password">
                                <button type="button">
                                    Esqueci minha senha
                                </button>
                            </Link>
                        </div>
                    </div>
                </fieldset>
                
            </form>
        </div>
    );
}

export default SignIn;