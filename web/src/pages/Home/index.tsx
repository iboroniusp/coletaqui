import React, { useEffect, ChangeEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase.js'

import './styles.css';

import logo from '../../assets/logo_coletaqui.jpeg';


const Home = () => {
    const [showUser, setShowUser] = React.useState(false)
    const hist = useHistory()

    useEffect(() => {
        observeLoginState()
    }, [])

    function observeLoginState() {
        auth.onAuthStateChanged(function(user) {
            if (user) {                
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                onUser(email)    
            } else {
                setUserEmail("")
            }
          });
    }

    function setUserEmail(userName: string | null) {
        var element = document.getElementById("userEmail") as HTMLButtonElement
        if (userName != null && element != null) {
            element.textContent = userName
        }
    }

    function onUser(email: string | null) {
        setShowUser(true)
        setUserEmail(email)
    }

    async function handleLogoutClick() {
        await auth.signOut()
        observeLoginState()
        setShowUser(false)
    }

    async function handleCreatePointClick() {
        hist.push("/create-point")
    }

    const UserView = () => (
        <div id="userview" className="userview">
            <text id="userEmail"/>
            <button type="button" onClick= {handleLogoutClick}>
                Logout
            </button>
        </div>
      )

    const LoginButton = () => (
        <Link to="/login">
            <span>
                <FiLogIn />
            </span>
            <strong>Login do ponto de coleta</strong>
        </Link>
    )

    const CreatePointButton = () => (
        <button  
            onClick={handleCreatePointClick}>
            <span >
                <FiLogIn />
            </span>
            <strong>Insira um ponto de coleta</strong>
        </button>
    )

    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="ColetAqui"/>
                    {showUser ? <UserView /> : null}
                </header>

                <main>
                    <h1>Busque locais para descarte de resíduos</h1>
                    <p>Encontre pontos de coleta: descartar ecologicamente agora ficou bem mais fácil!</p>

                    {showUser ? <CreatePointButton /> : null}
                    {showUser ? null : <LoginButton />}
                </main>
            </div>
        </div>
    );
}

export default Home;