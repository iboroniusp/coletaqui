import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import api from '../../services/api';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';

interface Point {
    id: number,
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
    image_url: string;
}

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState<Point[]>([])
    const [showNoPoints, setShowNoPoints] = useState(false)
    const [password, setPassword] = useState('');
    const hist = useHistory();
    
    useEffect(() => {
        api.get('user-points').then(response => {
            setPoints(response.data)
            setShowNoPoints((response.data as Point[]).length  == 0) 
        });
    }, []); 

    function handleSelectItem(id: number) {

    }

    const NoPointsView = () => (
        <div id="nopointsview" className="nopointsview">
            <text>Você ainda não cadastrou nenhum ponto</text>
        </div>
    )

    return (
        <div id="my-points-page">
            <header>
                <Link to="/">
                    <FiArrowLeft />
                    Home
                </Link>
            </header>

            <form >
            <fieldset>
                <legend>
                    <h2>Meus pontos</h2>
                    <Link to="/create-point">
                    <button>
                        Cadastrar ponto de coleta
                    </button>
                    </Link>
                </legend>
                {showNoPoints ? <NoPointsView /> : null}

                <ul className="items-grid">
                    {points.map(item => (
                        <li 
                            key={item.id} 
                            onClick={() => handleSelectItem(item.id)}
                        >
                            <img src={item.image_url} alt={item.name}/>
                            <span>{item.name}</span>
                        </li>
                    ))} 
                </ul>
            </fieldset>
                
            </form>
        </div>
    );
}

export default Register;