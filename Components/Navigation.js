import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,Dimensions, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import Home from '../Screens/Home'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import Icon from 'react-native-vector-icons/Ionicons'
const _COLOR = '#00ADB5'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import User from './Images/user.png'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const LoginScreen = () => {
    return(
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>
    )
}
const CustomDrawerContent = ({ navigation}) => {
    const auth = getAuth()
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const UserCred = onAuthStateChanged(auth, (user) => {
            if(user){
                setUserEmail(user.email)
            }
        })
            return UserCred

    }, [auth])

    const onLogOutPress = async () => {
    try {
        await auth.signOut();
        navigation.replace('AuthScreen', {
            screen: 'Login'
        });
    } catch (error) {
        console.log(error.code, error.message);
    }
    };


return (
    <View style={styles.Drawer}>
    <View style={styles.DrawerSide}>
        <Image source={User} resizeMode='cover' style={{width: 100, height: 100, borderRadius: 100, marginVertical: 10}}/>
        <Text style={styles.mail}>{userEmail}</Text>
    </View>
    <TouchableOpacity style={{
        backgroundColor: _COLOR, 
        marginVertical: 20, 
        padding: 15, 
        marginHorizontal: 10, 
        alignItems: 'center', 
        flexDirection: 'row'
        }
    }
    onPress={() => {navigation.navigate('AppScreen')}}>
        <Icon name='home' size={20} color='white'/>
        <Text style={{marginHorizontal: 40, color: 'white', fontWeight: 600}}>HomePage</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onLogOutPress} style={styles.logOut}>
        <Icon name='exit-outline' color='white' size={25}/>
        <Text style={styles.Out}>Logout</Text>
    </TouchableOpacity>
    </View>
)}

const DrawerScreen = ()=> {
    return(
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                name='Home' 
                component={Home} 
                options={{
                    title: 'HomePage', 
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#00ADB5',
                    
                    headerTitleStyle: {
                        color: '#00ADB5',
                        textAlign: 'center',
                        
                    }
                    }
                }
                
                />
        </Drawer.Navigator>
    )
}

const AppNavigation = () => {
const [userToken, setUserToken] = useState(null);
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const checkUserToken = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        setUserToken(token);
        setIsLoading(false)
    };

    checkUserToken();
}, []);

if(isLoading){
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={40} color={_COLOR}/>
        </View>
    )
}

return (
    <Stack.Navigator 
        initialRouteName={userToken ? 'AppScreen' : 'AuthScreen'}
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name='AppScreen' component={DrawerScreen}/>
        <Stack.Screen name='AuthScreen' component={LoginScreen}/>
    </Stack.Navigator>
);
};


const Navigation = () => {
return (
    <NavigationContainer>
        <AppNavigation/>
    </NavigationContainer>
)
}

export default Navigation

const styles = StyleSheet.create({
    Drawer: {
        flex: 1,
        
    },
    logOut: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: _COLOR,
        width: '90%',
        marginHorizontal: 15
    },
    Out: {
        fontSize: 20,
        color: 'white',
        // textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 30
    },
    DrawerSide: {
        height: Dimensions.get('screen').height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: _COLOR,
    },
    mail: {
        marginTop: 25,
        color: 'white'
    }
})