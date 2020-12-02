import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
// react navigation lida com rotas e a navegação stack é a navegação em pilhas (chamamos as próximas telas através de botão e o usuário consegue voltar pra tela anterior)

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator(); // quem orquestra toda a navegação

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{ // todas as telas 
                    cardStyle: {
                        backgroundColor: '#f0f0f5',
                    }
                }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
