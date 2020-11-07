/* Para que quando o usuário clicar no botão ele seja levado para outra página, precisamos criar um sistema de roteamento
    - BrowserRouter: rotas no formato "/nome" 
    - Cada página é um Route (tudo componente) 
    - Path: qual o endereço que tenho que acessar para essa rota estar visível para o usuário
        Verifica se começa com o digito, se você cria duas rotas com / e /nome, precisa especificar com exact (que na vdd é exact = {true})*/

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NewMember from './pages/NewMember';
import MyPoints from './pages/MyPoints';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={Login} path="/login" />
            <Route component={ForgotPassword} path="/forgot-password" />
            <Route component={NewMember} path="/newmember" />
            <Route component={MyPoints} path="/points" />
        </BrowserRouter>
    );
}

export default Routes;