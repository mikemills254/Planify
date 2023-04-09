import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator,Dimensions, Image, Pressable, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import HomeScreen from '../Screens/HomeScreen'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import AddTasks from '../Screens/AddTasks'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth, deleteUser } from 'firebase/auth'
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
    const  [myUserName, setUsername] = useState('')

    const EmailAddress = async () => {
        const myEmail = await AsyncStorage.getItem('UserEmail')
        setUserEmail(myEmail)
    }
    EmailAddress();

    const getUserName = async() => {
        const userName = await AsyncStorage.getItem('UserName')
        setUsername(userName)
    }
    getUserName();

    const onLogOutPress = async () => {
        try {
            await auth.signOut().then(() => {
                Alert.alert('Loging out', 'Are you sure?', [
                    {
                        text: 'ok',
                        onPress: () => {
                            navigation.replace('AuthScreen', {
                                screen: 'Login'
                            })
                        }
                    },
                    {
                        text: 'Cancel',
                    }
                ])
            })
            AsyncStorage.removeItem('UserAccess')
            AsyncStorage.removeItem('UserEmail')
            // console.log('Access Token Removed.')
        } catch (error) {
            console.log(error.code, error.message);
        }
    };
    

    const DeleteAccount = async () => {
        const user = await AsyncStorage.getItem('UserToken')
        console.log(user);

        deleteUser(user).then(() => {
            console.log('UserDeleted')
        }).catch((error) => {
            console.log(error)
        })
    };
    


return (
    <View style={styles.Drawer}>
    <View style={styles.DrawerSide}>
        <Image source={User} resizeMode='cover' style={{width: 100, height: 100, borderRadius: 100, marginVertical: 10}}/>
        <Text style={styles.mail}>{userEmail}</Text>
        <Text>{myUserName}</Text>
    </View>
    <Pressable style={{
        marginVertical: 20, 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        borderWidth: 0,
        marginHorizontal: 15
        }
    }
    onPress={() => {navigation.navigate('Home')}}>
        <Icon name='home' size={25} color={_COLOR}/>
        <Text style={styles.Out}>HomePage</Text>
    </Pressable>
    <Pressable onPress={onLogOutPress} style={styles.logOut}>
        <Icon name='exit-outline' color={_COLOR} size={25}/>
        <Text style={styles.Out}>Logout</Text>
    </Pressable>    
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
                component={HomeScreen} 
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
                <Drawer.Screen 
                    name='Tasks' 
                    component={AddTasks} 
                    options={{
                        title: 'New Task',
                        headerTintColor: '#00ADB5',
                        headerTitleStyle: {
                            color: '#00ADB5',
                            textAlign: 'center'
                        }
                        
                        
                        }}
                    
                    />
        </Drawer.Navigator>
    )
}

const AppNavigation = () => {
const [userToken, setUserToken] = useState(null);
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const checkUserToken = async () => {
        const token = await AsyncStorage.getItem('UserAccess');
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
        bottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        borderWidth: 0,
        marginHorizontal: 15,
        // backgroundColor: 'red'
    },
    Out: {
        fontSize: 15,
        fontWeight: 500,
        marginHorizontal: 10,
        color: _COLOR
    },
    DrawerSide: {
        height: Dimensions.get('screen').height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: _COLOR,
        padding: 10
    },
    mail: {
        marginTop: 25,
        color: 'white'
    }
})