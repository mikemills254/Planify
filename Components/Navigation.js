import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../Screens/Home'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

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

const DrawerScreen = ()=> {
    return(
        <Drawer.Navigator
            initialRouteName='Home'
            screenOptions={{headerShown: false}}
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
    return(
        <Stack.Navigator
            initialRouteName='AuthScreen'
            screenOptions={{headerShown: false}}
        >
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

const styles = StyleSheet.create({})