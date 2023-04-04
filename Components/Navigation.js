import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import Home from '../Screens/Home'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import Icon from 'react-native-vector-icons/Ionicons'
const _COLOR = '#00ADB5'


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
const Loading = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
    setIsLoading(false);
    if (user) {
        navigation.replace('AppScreen');
    } else {
        navigation.replace('AuthScreen');
    }
    });

    return unsubscribe;
}, [auth, navigation]);

if (isLoading) {
    return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={50} color={_COLOR}/>
    </View>
    )
}

return null;
};

const AppNavigation = () => {
    return(
        <Stack.Navigator
            initialRouteName='Loading'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Loading' component={Loading}/>
            <Stack.Screen name='AuthScreen' component={LoginScreen}/>
            <Stack.Screen name='AppScreen' component={DrawerScreen}/>
        </Stack.Navigator>
    )
}

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
    }
})