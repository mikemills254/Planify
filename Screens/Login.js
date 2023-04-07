import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView,  } from 'react-native'
import React,{useState, useEffect} from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'
import Ionic from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Components/FireBaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    const Navigation = useNavigation()

    const [Email, setEmail ] = useState('')
    const [Password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toogleEye =() => {
        setShowPassword(!showPassword);
    }

    const OnLoginPressed = async () => {
        try {
            const UserCred = await signInWithEmailAndPassword(auth, Email, Password)
            const user = UserCred.user;
            const UserEmail = user.email
            const UserAccess = await user.getIdToken()

            await AsyncStorage.setItem('UserAccess', UserAccess)

            Navigation.reset({
                index: 0,
                routes: [{ name: 'AppScreen' }]
            })
        } catch (error) {
            Alert.alert('Error', 'Credentials Check', [
                {
                    text: 'ok'
                },
                console.log(error)
            ])
        }
    }
    

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={styles.Container}>
        <View style={styles.Icon}>
            <Ionic name='check-circle' size={100} color='#00ADB5'/>
        </View>
        <Input
            placeholder='Email Address...'
            value={Email}
            onChangeText={email => setEmail(email)}
        />
        <Input
            placeholder='Password...'
            value={Password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={!showPassword}
            Icon={showPassword ? 'eye' : 'eye-off'}
            onPress={toogleEye}
        />
        <Button
            text='LOGIN'
            onPress={() => {
                OnLoginPressed()
            }}
        />
        <Button
            text='Forgot Password?'
            type='TERTIARY'
            onPress={() => {
            Navigation.navigate('Forget')
            }}
        />
        <Button
            text='----------or-----------'
            type='TERTIARY'
        />
        
        <Button
            text='Dont Have an Account? SIGNUP'
            type='TERTIARY'
            onPress={() => {
            Navigation.navigate('SignUp')
            }}
        />
        </SafeAreaView>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    Icon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        // marginBottom: 30,
        marginTop: '10%'
    }
})
