import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import fb from '../fb';
import AuthStackScreen from './AuthStackScreen';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading/Loading';


const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = fb.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    
    if (loading){
        return <Loading/>
    }

    return ( 
    <NavigationContainer>
        {user ? <HomeStack/> : <AuthStackScreen/>}
    </NavigationContainer> 
    );
}
 
export default Routes;