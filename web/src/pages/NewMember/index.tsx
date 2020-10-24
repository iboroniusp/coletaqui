import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { auth } from '../../firebase.js'

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hist = useHistory();
    
    async function signUpWithEmailAndPasswordHandler(event: FormEvent) {
        event.preventDefault();
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            alert("Cadastro Efetuado com sucesso")
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

        if(name === 'name') {
            setName(value);
        }
        else if(name === 'email') {
            setEmail(value);
        }
        else if(name === 'password'){
          setPassword(value);
        }
    }

    return (
        <div id="cadastro-page">
            <header>
                <Link to="/login">
                    <FiArrowLeft />
                    Login
                </Link>
            </header>

            <form onSubmit={signUpWithEmailAndPasswordHandler}>
                <fieldset>
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>
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
                            Cadastrar
                        </button>
                    </div>
                </fieldset>
                
            </form>
        </div>
    );
}

export default Register;